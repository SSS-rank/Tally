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
import com.sss.tally.domain.caculategroup.entity.CalculateGroup;
import com.sss.tally.domain.caculategroup.entity.CalculateGroupStatusEnum;
import com.sss.tally.domain.caculategroup.repository.CalculateGroupRepository;
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
import com.sss.tally.domain.travel.entity.Travel;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.CalculateException;
import com.sss.tally.global.error.exception.MemberException;
import com.sss.tally.global.error.exception.NotificationException;
import com.sss.tally.global.error.exception.PaymentException;

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
				map.put(memberPayment.getMemberId(), 1);
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
	public List<CalculateDto.GetRequestCalculateListRespDto> getRequestCalculate(String memberUuid) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		Member member = memberOptional.get();
		List<CalculateDto.GetRequestCalculateListRespDto> getRequestCalculateListRespDtoList = new ArrayList<>();
		List<CalculateGroup> calculateGroupList = calculateGroupRepository.findCalculateGroupsByMemberId(member);
		if (calculateGroupList.isEmpty()) {
			return getRequestCalculateListRespDtoList;
		}
		for (CalculateGroup calculateGroup : calculateGroupList) {
			Long amount = 0l;
			List<GroupPayment> groupPaymentList = groupPaymentRepository.findGroupPaymentsByCalculateGroupId(
				calculateGroup);
			if (groupPaymentList.isEmpty()) {
				throw new CalculateException(ErrorCode.NOT_EXIST_GROUP_PAYMENT);
			}
			for (GroupPayment groupPayment : groupPaymentList) {
				List<MemberPayment> memberPaymentList = memberPaymentRepository.findMemberPaymentsByPaymentIdAndStatusIsFalse(
					groupPayment.getPaymentId());
				if (memberPaymentList.isEmpty()) {
					throw new CalculateException(ErrorCode.NOT_EXIST_PAYMENT_MEMBER);
				}
				for (MemberPayment memberPayment : memberPaymentList) {
					amount += memberPayment.getAmount();
				}
			}
			CalculateDto.GetRequestCalculateListRespDto getRequestCalculateListRespDto =
				CalculateDto.GetRequestCalculateListRespDto.of(amount, calculateGroup);
			getRequestCalculateListRespDtoList.add(getRequestCalculateListRespDto);
		}
		return getRequestCalculateListRespDtoList;
	}

	@Override
	public List<CalculateDto.GetResponseCalculateListRespDto> getResponseCalculate(String memberUuid) {
		//탈퇴한 회원인지 검증
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
		//해당 그룹에 속한 결제건들을 전부 가져오고 해당 결제건 중 로그인 사용자가 지불 해야 할 돈만 가져오기
		for (GroupMember groupMember : groupMemberList) {
			Long amount = 0l;
			List<GroupPayment> groupPaymentList = groupPaymentRepository.findGroupPaymentsByCalculateGroupId(
				groupMember.getCalculateGroupId());
			if (groupPaymentList.isEmpty()) {
				throw new CalculateException(ErrorCode.NOT_EXIST_GROUP_PAYMENT);
			}
			for (GroupPayment groupPayment : groupPaymentList) {
				List<MemberPayment> memberPaymentList = memberPaymentRepository.findMemberPaymentsByPaymentIdAndMemberIdAndStatusIsFalse(
					groupPayment.getPaymentId(), member);
				if (memberPaymentList.isEmpty()) {
					throw new CalculateException(ErrorCode.NOT_EXIST_PAYMENT_MEMBER);
				}
				for (MemberPayment memberPayment : memberPaymentList) {
					amount += memberPayment.getAmount();
				}
			}
			//그룹 별 사용자가 줘야할 돈 및 정보 저장
			CalculateDto.GetResponseCalculateListRespDto getResponseCalculateListRespDto
				= CalculateDto.GetResponseCalculateListRespDto.of(amount, groupMember.getCalculateGroupId());
			getResponseCalculateListRespDtoList.add(getResponseCalculateListRespDto);
		}
		return getResponseCalculateListRespDtoList;
	}

	@Override
	public String rejectCalculate(CalculateDto.CalculateRejectReqDto calculateRejectReqDto, String memberUuid) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		//탈퇴한 멤버인지 검증
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}

		Member member = memberOptional.get();

		//정산 그룹 가져오기
		Optional<CalculateGroup> calculateGroupOptional =
			calculateGroupRepository.findCalculateGroupByCalculateGroupUuid(
				calculateRejectReqDto.getCalculateGruopUuid());

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
		CalculateDto.GetResponseCalculateDetailReqDto getResponseCalculateDetailReqDto, String memberUuid) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		//탈퇴한 멤버인지 검증

		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		Member member = memberOptional.get();
		//payment들 가져오기
		Optional<CalculateGroup> calculateGroupOptional =
			calculateGroupRepository.findCalculateGroupByCalculateGroupUuid(
				getResponseCalculateDetailReqDto.getCalculateGruopUuid());
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

		Travel travel = groupPaymentList.get(0).getPaymentId().getTravelId();
		String travelName = travel.getTravelTitle();
		LocalDateTime requestTime = calculateGroup.getCreateDate();
		Long totalAmount = 0l;
		String travelType = travel.getTravelType().toString();
		List<CalculateDto.Detail> detailList = new ArrayList<>();

		for (GroupPayment groupPayment : groupPaymentList) {
			CalculateDto.Detail detail = paymentRepository.findDetail(groupPayment.getPaymentId(), member);
			if (detail == null) {
				continue;
			}
			totalAmount += detail.getMyAmount();
			detailList.add(detail);
		}
		CalculateDto.GetResponseCalculateDetailRespDto getResponseCalculateDetailRespDto
			= CalculateDto.GetResponseCalculateDetailRespDto.of(travelType, travelName, requestTime, totalAmount,
			detailList);
		return getResponseCalculateDetailRespDto;
	}
}

