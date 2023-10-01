package com.sss.tally.domain.caculategroup.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.calculate.dto.CalculateDto;
import com.sss.tally.api.notification.dto.NotificationDto;
import com.sss.tally.domain.account.entity.Account;
import com.sss.tally.domain.account.repository.AccountRepository;
import com.sss.tally.domain.caculategroup.client.CalculateGroupClient;
import com.sss.tally.domain.caculategroup.entity.CalculateGroup;
import com.sss.tally.domain.caculategroup.entity.CalculateGroupStatusEnum;
import com.sss.tally.domain.caculategroup.repository.CalculateGroupRepository;
import com.sss.tally.domain.city.entity.City;
import com.sss.tally.domain.city.repository.CityRepository;
import com.sss.tally.domain.country.entity.Country;
import com.sss.tally.domain.country.repository.CountryRepository;
import com.sss.tally.domain.device.entity.Device;
import com.sss.tally.domain.device.repository.DeviceRepository;
import com.sss.tally.domain.groupmember.entity.GroupMember;
import com.sss.tally.domain.groupmember.repository.GroupMemberRepository;
import com.sss.tally.domain.grouppayment.entity.GroupPayment;
import com.sss.tally.domain.grouppayment.repository.GroupPaymentRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.domain.memberpayment.entity.MemberPayment;
import com.sss.tally.domain.memberpayment.repository.MemberPaymentRepository;
import com.sss.tally.domain.notification.document.Notification;
import com.sss.tally.domain.notification.repository.NotificationRepository;
import com.sss.tally.domain.notification.service.NotificationService;
import com.sss.tally.domain.payment.entity.CalculateStatusEnum;
import com.sss.tally.domain.payment.entity.Payment;
import com.sss.tally.domain.payment.repository.PaymentRepository;
import com.sss.tally.domain.state.entity.State;
import com.sss.tally.domain.state.repository.StateRepository;
import com.sss.tally.domain.travel.entity.Travel;
import com.sss.tally.domain.travel.repository.TravelRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.AccountException;
import com.sss.tally.global.error.exception.CalculateException;
import com.sss.tally.global.error.exception.MemberException;
import com.sss.tally.global.error.exception.NotificationException;
import com.sss.tally.global.error.exception.PaymentException;
import com.sss.tally.global.error.exception.TravelException;

import lombok.AllArgsConstructor;

@Transactional
@AllArgsConstructor
@Service
public class CalculateGroupServiceImpl implements CalculateGroupService {

	private final CalculateGroupRepository calculateGroupRepository;

	private final GroupMemberRepository groupMemberRepository;

	private final GroupPaymentRepository groupPaymentRepository;

	private final PaymentRepository paymentRepository;

	private final MemberPaymentRepository memberPaymentRepository;

	private final DeviceRepository deviceRepository;

	private final NotificationService notificationService;

	private final NotificationRepository notificationRepository;

	private final MemberRepository memberRepository;

	private final AccountRepository accountRepository;

	private final CalculateGroupClient calculateGroupClient;

	private final TravelRepository travelRepository;

	private final CityRepository cityRepository;

	private final StateRepository stateRepository;

	private final CountryRepository countryRepository;

	@Override
	public String createCalculate(List<CalculateDto.CalculateCreateReqDto> calculateCreateDto, String memberUuid) {
		List<Payment> payments = new ArrayList<>();
		//결제들꺼내기
		Member member = new Member();
		for (CalculateDto.CalculateCreateReqDto x : calculateCreateDto) {
			Optional<Payment> paymentOptional = paymentRepository.findPaymentByPaymentUuidAndStatusIsFalse(
				x.getPaymentUuid());
			if (paymentOptional.isEmpty()) {
				throw new PaymentException(ErrorCode.NOT_EXIST_PAYMENT);
			}
			Payment payment = paymentOptional.get();
			payments.add((payment));
			//결제자가 전부 동일 해야 함
			if (member.getMemberId() == null) {
				member = payment.getMemberId();
			} else if (!member.equals(payment.getMemberId())) {
				throw new CalculateException(ErrorCode.NOT_IDENTICAL_MEMBER);
			}
			member = payment.getMemberId();

			//BEFORE상태여야함
			if (payment.getCalculateStatus() != CalculateStatusEnum.BEFORE) {
				throw new CalculateException(ErrorCode.NOT_BEFORE_STATUS);
			}

		}

		Member payer = new Member();
		payer = payments.get(0).getMemberId();
		if (payer == null) {
			throw new CalculateException(ErrorCode.NOT_EXIST_PAYER);
		}
		if (!payer.getMemberUuid().equals(memberUuid)) {
			throw new CalculateException(ErrorCode.NOT_EQUAL_LOGIN_MEMBER_PAYER);
		}

		//정산 그룹 생성하기
		String uuid = UUID.randomUUID().toString();
		CalculateGroup calculateGroup = calculateGroupRepository.save(
			CalculateGroup.of(CalculateGroupStatusEnum.ONGOING, uuid, payer));
		HashMap<Member, Integer> map = new HashMap<>();

		//정산 그룹에 각 payment들 넣기

		for (Payment payment : payments) {
			groupPaymentRepository.save(GroupPayment.of(payment, calculateGroup));

			//결제에 속한 멤버 아이디들 전부 가져오며 중복인 애들은 없애야 함.
			List<MemberPayment> memberPaymentList = memberPaymentRepository.findMemberPaymentsByPaymentIdAndStatusIsFalse(
				payment);
			if (memberPaymentList.isEmpty()) {
				throw new CalculateException(ErrorCode.NOT_EXIST_PAYMENT_MEMBER);
			}
			for (MemberPayment memberPayment : memberPaymentList) {
				if(!memberPayment.getMemberId().equals(payer)){
					map.put(memberPayment.getMemberId(), 1);
				}

			}
			//각 payment의 상태 ongoing으로 변경
			payment.updateCalculateStatusEnum(CalculateStatusEnum.ONGOING);

		}

		//결제에 속해져 있는 멤버들 가져오기
		Set<Member> keys = map.keySet();
		List<NotificationDto.NotificationReqDto> notificationReqDtoList = new ArrayList<>();
		//알림 저장 위한 Dto 틀 및 여행 정보 가져오기
		Travel travel = payments.get(0).getTravelId();
		String travelName = travel.getTravelTitle();
		//그룸 멤버에 해당 멤버들 저장하기
		for (Member key : keys) {

			groupMemberRepository.save(GroupMember.of(key, calculateGroup, false));
			//알림 보내기 위해 Dto 생성
			Optional<Device> deviceOptional = deviceRepository.findDeviceByMemberIdAndDeviceStatusIsTrueAndIsLoginIsTrue(
				key);
			if (deviceOptional.isEmpty()) {
				throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
			}
			Device device = deviceOptional.get();
			NotificationDto.NotificationReqDto notificationReqDto = NotificationDto.NotificationReqDto.of(device,
				payer.getNickname() + " 님이 정산을 요청하였습니다.", "정산 요청");
			notificationReqDtoList.add(notificationReqDto);
			//알림 저장히기 위한 Dto 생성
			Notification notification = Notification.of("request_calculate", payer.getMemberUuid(),
				payer.getNickname(), key.getMemberUuid(), key.getNickname(), travelName);
			//알림함에 저장
			notificationRepository.save(notification);

		}

		//알림 보내기
		List<NotificationDto.NotificationRespDto> notificationRespDtoList = notificationService.sendNotificationList(
			notificationReqDtoList);

		List<NotificationDto.NotificationReqDto> notificationReqDtoFailList = new ArrayList<>();
		boolean flag = false;
		// 빈 리스트에 대한 처리
		if (notificationRespDtoList.isEmpty()) {
			throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
		} else {
			for (NotificationDto.NotificationRespDto notificationRespDto : notificationRespDtoList) {
				if (notificationRespDto.getCode() == -1) {
					notificationReqDtoFailList.add(notificationRespDto.getNotificationReqDto());
					flag = true;
				}
			}
		}
		//실패한 애들 다시 모아서 다시 보내기
		if (flag) {
			List<NotificationDto.NotificationRespDto> reNotificationRespDtoList = notificationService.sendNotificationList(
				notificationReqDtoList);
			if (reNotificationRespDtoList.isEmpty()) {
				throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
			}
			for (NotificationDto.NotificationRespDto notificationRespDto : reNotificationRespDtoList) {
				if (notificationRespDto.getCode() == -1) {
					throw new NotificationException(ErrorCode.FAIL_SEND_NOTIFICATION);
				}
			}
		}

		return "ok";
	}

	@Override
	public List<CalculateDto.GetRequestCalculateListRespDto> getRequestCalculate(String memberUuid, Long travelId) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		Member member = memberOptional.get();
		List<CalculateDto.GetRequestCalculateListRespDto> getRequestCalculateListRespDtoList = new ArrayList<>();
		List<CalculateGroup> calculateGroupList = calculateGroupRepository.findCalculateGroupsByMemberId(member);
		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(
			travelId);
		if (travelOptional.isEmpty()) {
			throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);
		}
		Travel travel = travelOptional.get();
		if (calculateGroupList.isEmpty()) {
			return getRequestCalculateListRespDtoList;
		}
		for (CalculateGroup calculateGroup : calculateGroupList) {

			List<GroupPayment> groupPaymentList = groupPaymentRepository.findGroupPaymentsByCalculateGroupIdAndTravel(
				calculateGroup, travel);

			if (groupPaymentList.isEmpty()) {
				return null;
			}

			Long amount = 0L;
			for (GroupPayment groupPayment : groupPaymentList) {
				double ratio = groupPayment.getPaymentId().getRatio();
				List<MemberPayment> memberPaymentList = memberPaymentRepository.findMemberPaymentsByPaymentIdAndStatusIsFalse(
					groupPayment.getPaymentId());
				if (memberPaymentList.isEmpty()) {
					throw new CalculateException(ErrorCode.NOT_EXIST_PAYMENT_MEMBER);
				}
				for (MemberPayment memberPayment : memberPaymentList) {
					amount += Math.round(memberPayment.getAmount() * ratio);
				}
			}
			CalculateDto.GetRequestCalculateListRespDto getRequestCalculateListRespDto =
				CalculateDto.GetRequestCalculateListRespDto.of(amount, calculateGroup);
			getRequestCalculateListRespDtoList.add(getRequestCalculateListRespDto);
		}
		return getRequestCalculateListRespDtoList;
	}

	@Override
	public List<CalculateDto.GetResponseCalculateListRespDto> getResponseCalculate(String memberUuid, Long travelId) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		//요청 리스트
		List<CalculateDto.GetResponseCalculateListRespDto> getResponseCalculateListRespDtoList = new ArrayList<>();
		Member member = memberOptional.get();
		//사용자가 속한 그룹 멤버 리스트 가져오기
		List<GroupMember> groupMemberList = groupMemberRepository.findGroupMembersByMemberId(member);
		if (groupMemberList.isEmpty()) {
			return getResponseCalculateListRespDtoList;
		}
		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(
			travelId);
		if (travelOptional.isEmpty()) {
			throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);
		}
		Travel travel = travelOptional.get();
		//해당 그룹에 속한 결제건들을 전부 가져오고 해당 결제건 중 로그인 사용자가 지불 해야 할 돈만 가져오기
		for (GroupMember groupMember : groupMemberList) {
			Long amount = 0L;
			List<GroupPayment> groupPaymentList = groupPaymentRepository.findGroupPaymentsByCalculateGroupIdAndTravel(
				groupMember.getCalculateGroupId(), travel);

			if (groupPaymentList.isEmpty()) {
				return null;
			}
			for (GroupPayment groupPayment : groupPaymentList) {
				double ratio = groupPayment.getPaymentId().getRatio();
				Optional<MemberPayment> memberPaymentOptional = memberPaymentRepository.findMemberPaymentByPaymentIdAndMemberIdAndStatusIsFalse(
					groupPayment.getPaymentId(), member);
				if (memberPaymentOptional.isEmpty()) {
					continue;
				}
				MemberPayment memberPayment = memberPaymentOptional.get();
				amount += Math.round(memberPayment.getAmount() * ratio);

			}
			//그룹 별 사용자가 줘야할 돈 및 정보 저장
			CalculateDto.GetResponseCalculateListRespDto getResponseCalculateListRespDto
				= CalculateDto.GetResponseCalculateListRespDto.of(amount,
				groupMember.getCalculateGroupId());
			getResponseCalculateListRespDtoList.add(getResponseCalculateListRespDto);
		}
		return getResponseCalculateListRespDtoList;
	}

	@Override
	public String rejectCalculate(CalculateDto.CalculateRejectReqDto calculateRejectReqDto, String memberUuid) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}

		Member member = memberOptional.get();

		//정산 그룹 가져오기
		Optional<CalculateGroup> calculateGroupOptional =
			calculateGroupRepository.findCalculateGroupByCalculateGroupUuid(
				calculateRejectReqDto.getCalculateGroupUuid());

		//정산 그룹 없을 시 예외
		if (calculateGroupOptional.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_VALID_CALCULATE_UUID);
		}
		CalculateGroup calculateGroup = calculateGroupOptional.get();
		//결제자와 반려자가 같을 수 없음
		if (member.equals(calculateGroup.getMemberId())) {
			throw new CalculateException(ErrorCode.CANT_EQUAL_PAYER_REJECTOR);
		}
		//정산 그룹 상태 변경
		calculateGroup.updateStatus(CalculateGroupStatusEnum.REJECT);
		//정산 그룹에 속한 결제건들 가져오기
		List<GroupPayment> groupPaymentList = groupPaymentRepository.findGroupPaymentsByCalculateGroupId(
			calculateGroup);
		//값 비어있을 시 예외
		if (groupPaymentList.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_EXIST_GROUP_PAYMENT);
		}
		//결제건들 상태 변경
		for (GroupPayment groupPayment : groupPaymentList) {
			groupPayment.getPaymentId().updateCalculateStatusEnum(CalculateStatusEnum.BEFORE);
		}
		//알림 저장 위한 멤버 리스트 저장
		List<Member> memberList = new ArrayList<>();
		memberList.add(calculateGroup.getMemberId());
		//본인을 제외한 결제자와 태그 사용자들 추가
		List<GroupMember> groupMemberList = groupMemberRepository.findGroupMembersByCalculateGroupId(calculateGroup);
		for (GroupMember groupMember : groupMemberList) {
			if (groupMember.getMemberId().equals(member)) {
				continue;
			} else {
				memberList.add(groupMember.getMemberId());
			}
		}
		//알림 저장 위한 여행정보 가져오기
		String travelName = groupPaymentList.get(0).getPaymentId().getTravelId().getTravelTitle();
		//해당 사용자들에게 보낸 알림 저장
		//알림 보내기 위한 dto
		List<NotificationDto.NotificationReqDto> notificationReqDtoList = new ArrayList<>();
		for (Member receiver : memberList) {
			Notification notification = Notification.of("reject_calculate", member.getMemberUuid(),
				member.getNickname(), receiver.getMemberUuid(), receiver.getNickname(), travelName);
			//알림함에 저장
			notificationRepository.save(notification);

			//알림 보내기 위한 dto 값 채우기
			Optional<Device> deviceOptional = deviceRepository.findDeviceByMemberIdAndDeviceStatusIsTrueAndIsLoginIsTrue(
				receiver);
			if (deviceOptional.isEmpty()) {
				throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
			}
			Device device = deviceOptional.get();
			NotificationDto.NotificationReqDto notificationReqDto = NotificationDto.NotificationReqDto.of(device,
				member.getNickname() + " 님이 " + calculateRejectReqDto.getContent() + " 사유로 정산을 반려했습니다.", "정산 반려");
			notificationReqDtoList.add(notificationReqDto);

		}

		//알림 보내기
		List<NotificationDto.NotificationRespDto> notificationRespDtoList = notificationService.sendNotificationList(
			notificationReqDtoList);

		List<NotificationDto.NotificationReqDto> notificationReqDtoFailList = new ArrayList<>();
		boolean flag = false;
		// 빈 리스트에 대한 처리
		if (notificationRespDtoList.isEmpty()) {
			throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
		} else { //실패한 애들이이 있다면 따로 또 모으기
			for (NotificationDto.NotificationRespDto notificationRespDto : notificationRespDtoList) {
				if (notificationRespDto.getCode() == -1) {
					notificationReqDtoFailList.add(notificationRespDto.getNotificationReqDto());
					flag = true;
				}
			}
		}
		//실패한 애들 다시 모아서 다시 보내기
		if (flag) {
			List<NotificationDto.NotificationRespDto> reNotificationRespDtoList = notificationService.sendNotificationList(
				notificationReqDtoList);
			if (reNotificationRespDtoList.isEmpty()) {
				throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
			}//이번에도 보내기 실패하면 예외처리
			for (NotificationDto.NotificationRespDto notificationRespDto : reNotificationRespDtoList) {
				if (notificationRespDto.getCode() == -1) {
					throw new NotificationException(ErrorCode.FAIL_SEND_NOTIFICATION);
				}
			}
		}

		return "ok";
	}

	@Override
	public CalculateDto.GetResponseCalculateDetailRespDto getResponseCalculateDetail(
		String calculateGroupUuid, String memberUuid) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);

		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		Member member = memberOptional.get();
		//payment들 가져오기
		Optional<CalculateGroup> calculateGroupOptional =
			calculateGroupRepository.findCalculateGroupByCalculateGroupUuid(
				calculateGroupUuid);
		if (calculateGroupOptional.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_VALID_CALCULATE_UUID);
		}
		CalculateGroup calculateGroup = calculateGroupOptional.get();
		//그룹에 속한 payment 객체들 가져오기
		List<GroupPayment> groupPaymentList = groupPaymentRepository.findGroupPaymentsByCalculateGroupId(
			calculateGroup);

		if (groupPaymentList.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_EXIST_GROUP_PAYMENT);
		}
		Payment payment = groupPaymentList.get(0).getPaymentId();
		Travel travel = payment.getTravelId();
		String travelName = travel.getTravelTitle();
		LocalDateTime requestTime = calculateGroup.getCreateDate();
		Long totalAmount = 0l;
		String travelType = travel.getTravelType().toString();
		if (travelType.equals("GLOBAL")) {
			Optional<Country> countryOptional = countryRepository.findCountryByCountryId(travel.getTravelLocation());
			travelType = countryOptional.get().getCountryName();
		} else if (travelType.equals("CITY")) {
			Optional<City> cityOptional = cityRepository.findCityByCityId(travel.getTravelLocation());
			travelType = cityOptional.get().getCityName();
		} else {
			Optional<State> stateOptional = stateRepository.findStateByStateId(travel.getTravelLocation());
			travelType = stateOptional.get().getStateName();
		}
		List<CalculateDto.Detail> detailList = new ArrayList<>();

		for (GroupPayment groupPayment : groupPaymentList) {
			double ratio = groupPayment.getPaymentId().getRatio();
			CalculateDto.Detail detail = paymentRepository.findDetail(groupPayment.getPaymentId(), member);
			if (detail == null) {
				continue;
			}
			totalAmount += Math.round(detail.getMyAmount() * ratio);
			detailList.add(detail);
		}
		//정산 완료 상태 추가
		Optional<GroupMember> groupMemberOptional = groupMemberRepository.findGroupMemberByCalculateGroupIdAndMemberId(
			calculateGroup, member);
		if (groupMemberOptional.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_EXIST_GROUP_MEMBER);
		}
		GroupMember groupMember = groupMemberOptional.get();
		CalculateDto.GetResponseCalculateDetailRespDto getResponseCalculateDetailRespDto
			= CalculateDto.GetResponseCalculateDetailRespDto.of(travelType, travelName, requestTime,
			totalAmount,
			detailList, groupMember.getStatus());
		return getResponseCalculateDetailRespDto;
	}

	@Override
	public String acceptCalculate(CalculateDto.CalculateAcceptReqDto calculateAcceptReqDto, String memberUuid) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		Member member = memberOptional.get();
		Optional<CalculateGroup> calculateGroupOptional =
			calculateGroupRepository.findCalculateGroupByCalculateGroupUuid(
				calculateAcceptReqDto.getCalculateGroupUuid());
		if (calculateGroupOptional.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_VALID_CALCULATE_UUID);
		}
		CalculateGroup calculateGroup = calculateGroupOptional.get();
		//반려 상태이거나 완료 상태인건 에러
		if (!calculateGroup.getStatus().equals(CalculateGroupStatusEnum.ONGOING)) {
			throw new CalculateException(ErrorCode.PAYMENT_NOT_ONGOING);
		}

		Optional<GroupMember> groupMemberOptional = groupMemberRepository.findGroupMemberByCalculateGroupIdAndMemberId(
			calculateGroup, member);
		if (groupMemberOptional.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_EXIST_CALCULATE_MEMBER);
		}
		//상태가 이미 true이면 예외
		GroupMember groupMember = groupMemberOptional.get();
		if (groupMember.getStatus()) {
			throw new CalculateException(ErrorCode.ALREADY_CALCULATE_MEMBER);
		}
		groupMember.updateStatus(true);

		//넘겨준 계좌를 저장하자 ! ! ! ! !!
		groupMember.updateAccountNumber(calculateAcceptReqDto.getAccountNumber());
		//모든 사람이 true인지 확인하자
		boolean isAllTrue = false;
		int cnt = 0;
		List<GroupMember> groupMemberList = groupMemberRepository.findGroupMembersByCalculateGroupId(calculateGroup);
		for (GroupMember memberOfGroup : groupMemberList) {

			if (memberOfGroup.getStatus()) {
				cnt++;
			}
		}
		//모두 확인일 경우
		if (cnt == groupMemberList.size()) {
			//그룹을 정산 완료로 상태 변경
			calculateGroup.updateStatus(CalculateGroupStatusEnum.COMPLETE);

			List<GroupPayment> groupPaymentList = groupPaymentRepository.findGroupPaymentsByCalculateGroupId(
				calculateGroup);
			if (groupPaymentList.isEmpty()) {
				throw new CalculateException(ErrorCode.NOT_EXIST_GROUP_PAYMENT);
			}
			//각 결제별 상태 변경
			for (GroupPayment groupPayment : groupPaymentList) {
				//하나라도 상태가 ONGION이 아니라면 에러
				if (groupPayment.getPaymentId().getCalculateStatus().equals(CalculateStatusEnum.ONGOING)) {

				}
				groupPayment.getPaymentId().updateCalculateStatusEnum(CalculateStatusEnum.AFTER);
			}
			//결제자 에게 돈 보내야 함 결제자 가져오기
			Payment payment = groupPaymentList.get(0).getPaymentId();
			Member payer = payment.getMemberId();

			//결제자 계쫘
			Optional<Account> payerAccountOptional = accountRepository.findAccountByMemberIdAndStatusIsFalseAndRepresentativeAccountIsTrue(
				payer);
			if (payerAccountOptional.isEmpty()) {
				throw new AccountException(ErrorCode.NOT_EXIST_ACCOUNT);
			}
			Account payerAccount = payerAccountOptional.get();
			//여행 이름
			String travelName = groupPaymentList.get(0).getPaymentId().getTravelId().getTravelTitle();
			//알림 리스트
			List<NotificationDto.NotificationReqDto> notificationReqDtoList = new ArrayList<>();
			//사용자 별 보내줘야 할 금액 구하고 보내기....
			for (GroupMember memberOfGroup : groupMemberList) {
				Long amount = 0l;
				for (GroupPayment groupPayment : groupPaymentList) {
					double ratio = groupPayment.getPaymentId().getRatio();
					//멤버 별 지불할 총 금액 구하기
					Optional<MemberPayment> memberPaymentOptional = memberPaymentRepository.findMemberPaymentByPaymentIdAndMemberIdAndStatusIsFalse(
						groupPayment.getPaymentId(), memberOfGroup.getMemberId());
					if (memberPaymentOptional.isEmpty()) {
						continue;
					}
					MemberPayment memberPayment = memberPaymentOptional.get();
					amount += Math.round(memberPayment.getAmount() * ratio);

				}
				//이제 여기서 페인클라이언트로 보내고 나중에 알람 보내면 됨
				Optional<Account> accountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
					memberOfGroup.getAccountNumber());
				Account account = accountOptional.get();
				CalculateDto.TransferDepositReqDto transferDepositReqDto = CalculateDto.TransferDepositReqDto.of(
					memberOfGroup.getAccountNumber(), payerAccount.getAccountNumber(), amount,
					"tally" + payer.getNickname(),
					"tally" + memberOfGroup.getMemberId().getNickname(), payerAccount.getBankCode(),
					account.getAccountPassword()
				);
				String CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
				calculateGroupClient.deposit(CONTENT_TYPE, transferDepositReqDto);

				Notification notification = Notification.of("complete_calculate", "555",
					"Tally", memberOfGroup.getMemberId().getMemberUuid(), memberOfGroup.getMemberId().getNickname(),
					travelName);
				//알림함에 저장
				notificationRepository.save(notification);

				//알림 DTO 생성
				Optional<Device> deviceOptional = deviceRepository.findDeviceByMemberIdAndDeviceStatusIsTrueAndIsLoginIsTrue(
					memberOfGroup.getMemberId());
				if (deviceOptional.isEmpty()) {
					throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
				}
				Device device = deviceOptional.get();
				NotificationDto.NotificationReqDto notificationReqDto = NotificationDto.NotificationReqDto.of(device,
					travelName + "의 " + payer.getNickname() + "님이 신청한 정산이 완료되었습니다.", "정산 완료");
				notificationReqDtoList.add(notificationReqDto);

			}
			//결제자 알림 저장 및 알림 보내기 저장
			Notification notification = Notification.of("complete_calculate", "555",
				"Tally_", payer.getMemberUuid(), payer.getNickname(), travelName);
			//알림함에 저장
			notificationRepository.save(notification);

			Optional<Device> deviceOptional = deviceRepository.findDeviceByMemberIdAndDeviceStatusIsTrueAndIsLoginIsTrue(
				payer);
			if (deviceOptional.isEmpty()) {
				throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
			}
			Device device = deviceOptional.get();
			NotificationDto.NotificationReqDto notificationReqDto = NotificationDto.NotificationReqDto.of(device,
				travelName + "의 " + payer.getNickname() + "님이 신청한 정산이 완료되었습니다.", "정산 완료");
			notificationReqDtoList.add(notificationReqDto);

			//알림 전송

			//알림 보내기
			List<NotificationDto.NotificationRespDto> notificationRespDtoList = notificationService.sendNotificationList(
				notificationReqDtoList);

			List<NotificationDto.NotificationReqDto> notificationReqDtoFailList = new ArrayList<>();
			boolean flag = false;
			// 빈 리스트에 대한 처리
			if (notificationRespDtoList.isEmpty()) {
				throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
			} else { //실패한 애들이이 있다면 따로 또 모으기
				for (NotificationDto.NotificationRespDto notificationRespDto : notificationRespDtoList) {
					if (notificationRespDto.getCode() == -1) {
						notificationReqDtoFailList.add(notificationRespDto.getNotificationReqDto());
						flag = true;
					}
				}
			}
			//실패한 애들 다시 모아서 다시 보내기
			if (flag) {
				List<NotificationDto.NotificationRespDto> reNotificationRespDtoList = notificationService.sendNotificationList(
					notificationReqDtoList);
				if (reNotificationRespDtoList.isEmpty()) {
					throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
				}//이번에도 보내기 실패하면 예외처리
				for (NotificationDto.NotificationRespDto notificationRespDto : reNotificationRespDtoList) {
					if (notificationRespDto.getCode() == -1) {
						throw new NotificationException(ErrorCode.FAIL_SEND_NOTIFICATION);
					}
				}
			}

			return "ok";
		} else {
			return "ok";
		}

	}

	@Override
	public CalculateDto.GetRequestCalculateDetailRespDto getRequestCalculateDetail(
		String calculateGroupUuid, String memberUuid) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);

		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		Member member = memberOptional.get();
		//payment들 가져오기
		Optional<CalculateGroup> calculateGroupOptional =
			calculateGroupRepository.findCalculateGroupByCalculateGroupUuid(
				calculateGroupUuid);
		if (calculateGroupOptional.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_VALID_CALCULATE_UUID);
		}
		CalculateGroup calculateGroup = calculateGroupOptional.get();
		List<GroupMember> groupMemberList = groupMemberRepository.findGroupMembersByCalculateGroupId(calculateGroup);
		if (groupMemberList.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_EXIST_GROUP_MEMBER);
		}

		List<GroupPayment> groupPaymentList = groupPaymentRepository.findGroupPaymentsByCalculateGroupId(
			calculateGroup);
		if (groupPaymentList.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_EXIST_GROUP_PAYMENT);
		}
		List<CalculateDto.RequestDetail> requestDetails = new ArrayList<>();
		Payment payment = groupPaymentList.get(0).getPaymentId();
		Travel travel = payment.getTravelId();
		String travelName = travel.getTravelTitle();
		LocalDateTime requestTime = calculateGroup.getCreateDate();
		Long totalAmount = 0l;
		String travelType = travel.getTravelType().toString();
		if (travelType.equals("GLOBAL")) {
			Optional<Country> countryOptional = countryRepository.findCountryByCountryId(travel.getTravelLocation());
			travelType = countryOptional.get().getCountryName();
		} else if (travelType.equals("CITY")) {
			Optional<City> cityOptional = cityRepository.findCityByCityId(travel.getTravelLocation());
			travelType = cityOptional.get().getCityName();
		} else {
			Optional<State> stateOptional = stateRepository.findStateByStateId(travel.getTravelLocation());
			travelType = stateOptional.get().getStateName();
		}
		for (GroupMember groupMember : groupMemberList) {
			Long amount = 0l;
			for (GroupPayment groupPayment : groupPaymentList) {
				double ratio = groupPayment.getPaymentId().getRatio();
				Optional<MemberPayment> memberPaymentOptional = memberPaymentRepository.findMemberPaymentByPaymentIdAndMemberIdAndStatusIsFalse(
					groupPayment.getPaymentId(), groupMember.getMemberId());
				if (memberPaymentOptional.isEmpty()) {
					continue;
				}
				MemberPayment memberPayment = memberPaymentOptional.get();
				amount += Math.round(memberPayment.getAmount() * ratio);

			}
			String status = "";
			if (groupMember.getStatus()) {
				status = "확인 완료";
			} else {
				status = "요청 중";
			}
			CalculateDto.RequestDetail requestDetail = CalculateDto.RequestDetail.of(groupMember.getMemberId(), status,
				amount);
			requestDetails.add(requestDetail);
			totalAmount += amount;
		}
		CalculateDto.GetRequestCalculateDetailRespDto getRequestCalculateDetailRespDto = CalculateDto.GetRequestCalculateDetailRespDto.of(
			travelType, travelName, requestTime, totalAmount, requestDetails
		);
		return getRequestCalculateDetailRespDto;
	}

	@Override
	public CalculateDto.GetRequestCalculateDetailByMemberRespDto getRequestCalculateDetailByMember(
		String calculateGroupUuid, String memberUuid, String loginMemberUuid) {
		Optional<Member> loginMemberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(
			loginMemberUuid);
		if (loginMemberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(
			memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);
		}
		Member member = memberOptional.get();

		Optional<CalculateGroup> calculateGroupOptional = calculateGroupRepository.findCalculateGroupByCalculateGroupUuid(
			calculateGroupUuid);
		if (calculateGroupOptional.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_VALID_CALCULATE_UUID);
		}
		CalculateGroup calculateGroup = calculateGroupOptional.get();
		List<GroupPayment> groupPaymentList = groupPaymentRepository.findGroupPaymentsByCalculateGroupId(
			calculateGroup);
		if (groupPaymentList.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_EXIST_GROUP_PAYMENT);
		}
		List<CalculateDto.RequestDetailByMember> requestDetailByMembers = new ArrayList<>();
		Long totalAmount = 0l;
		for (GroupPayment groupPayment : groupPaymentList) {
			double ratio = groupPayment.getPaymentId().getRatio();
			Payment payment = groupPayment.getPaymentId();
			Optional<MemberPayment> memberPaymentOptional = memberPaymentRepository.findMemberPaymentByPaymentIdAndMemberIdAndStatusIsFalse(
				payment, member);
			if (memberPaymentOptional.isEmpty()) {
				continue;
			}
			MemberPayment memberPayment = memberPaymentOptional.get();
			Long myAmount = Math.round(memberPayment.getAmount() * ratio);
			String paymentName = payment.getPaymentName();
			Long allAmount = Math.round(payment.getAmount() * ratio);
			LocalDateTime paymentDate = payment.getPaymentKoreaDate();
			totalAmount += myAmount;
			CalculateDto.RequestDetailByMember requestDetailByMember = CalculateDto.RequestDetailByMember.of(
				paymentName, paymentDate, myAmount, allAmount
			);
			requestDetailByMembers.add(requestDetailByMember);
		}

		CalculateDto.GetRequestCalculateDetailByMemberRespDto getRequestCalculateDetailByMemberRespDto =
			CalculateDto.GetRequestCalculateDetailByMemberRespDto.of(
				member.getNickname(), totalAmount, requestDetailByMembers
			);
		return getRequestCalculateDetailByMemberRespDto;
	}

	@Override
	public CalculateDto.GetCalculateFinalReceiptRespDto getCalculateFinalReceipt(String calculateGroupUuid,
		String memberUuid) {

		Optional<CalculateGroup> calculateGroupOptional = calculateGroupRepository.findCalculateGroupByCalculateGroupUuid(
			calculateGroupUuid);
		if (calculateGroupOptional.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_VALID_CALCULATE_UUID);
		}
		CalculateGroup calculateGroup = calculateGroupOptional.get();

		List<GroupPayment> groupPaymentList = groupPaymentRepository.findGroupPaymentsByCalculateGroupId(
			calculateGroup);
		if (groupPaymentList.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_EXIST_GROUP_PAYMENT);
		}
		List<CalculateDto.MemberInfo> memberInfos = new ArrayList<>();
		List<CalculateDto.FinalReceiptDetail> finalReceiptDetails = new ArrayList<>();

		//그룹 멤버 리스트
		List<GroupMember> groupMemberList = groupMemberRepository.findGroupMembersByCalculateGroupId(calculateGroup);
		if (groupPaymentList.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_EXIST_CALCULATE_MEMBER);
		}
		for (GroupMember groupMember : groupMemberList) {
			Member memberOfGroup = groupMember.getMemberId();
			CalculateDto.MemberInfo memberInfo = CalculateDto.MemberInfo.of(memberOfGroup.getNickname(),
				memberOfGroup.getProfileImage());
			memberInfos.add(memberInfo);
		}
		//결제자 넣기
		String payerName = calculateGroup.getMemberId().getNickname();
		CalculateDto.MemberInfo memberInfo = CalculateDto.MemberInfo.of(payerName,
			calculateGroup.getMemberId().getProfileImage());
		memberInfos.add(memberInfo);
		//결제 리스트 별 결제정보 넣기
		for (GroupPayment groupPayment : groupPaymentList) {
			Payment payment = groupPayment.getPaymentId();
			List<MemberPayment> memberPaymentList = memberPaymentRepository.findMemberPaymentsByPaymentIdAndStatusIsFalse(
				payment);
			if (memberPaymentList.isEmpty()) {
				throw new CalculateException(ErrorCode.NOT_EXIST_PAYMENT_MEMBER);
			}
			List<String> memberName = new ArrayList<>();
			//결제자는 무조건 넣기
			memberName.add(payerName);
			for (MemberPayment memberPayment : memberPaymentList) {
				memberName.add(memberPayment.getMemberId().getNickname());
			}
			CalculateDto.FinalReceiptDetail finalReceiptDetail = CalculateDto.FinalReceiptDetail.of(
				payment.getPaymentName(), payment.getPaymentKoreaDate(),
				Math.round(payment.getAmount() * payment.getRatio()), memberName
			);
			finalReceiptDetails.add(finalReceiptDetail);
		}
		Travel travel = groupPaymentList.get(0).getPaymentId().getTravelId();
		CalculateDto.GetCalculateFinalReceiptRespDto getCalculateFinalReceiptRespDto =
			CalculateDto.GetCalculateFinalReceiptRespDto.of(
				travel, finalReceiptDetails, memberInfos
			);
		return getCalculateFinalReceiptRespDto;
	}
}


