package com.sss.tally.domain.caculategroup.service;

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
			Optional<Payment> paymentOptional = paymentRepository.findPaymentByPaymentUuid(x.getPaymentUuid());
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
			List<MemberPayment> memberPaymentList = memberPaymentRepository.findMemberPaymentsByPaymentId(payment);
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
			Notification notification = Notification.of("requestCalculate", payer.getMemberUuid(),
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
				List<MemberPayment> memberPaymentList = memberPaymentRepository.findMemberPaymentsByPaymentId(
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
}
