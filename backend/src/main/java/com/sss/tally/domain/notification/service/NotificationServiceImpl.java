package com.sss.tally.domain.notification.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;

import com.sss.tally.domain.memberpayment.repository.MemberPaymentRepository;
import com.sss.tally.domain.payment.entity.Payment;
import com.sss.tally.domain.payment.repository.PaymentRepository;
import com.sss.tally.global.error.exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.google.firebase.messaging.SendResponse;
import com.sss.tally.api.notification.dto.NotificationDto;
import com.sss.tally.domain.device.entity.Device;
import com.sss.tally.domain.device.repository.DeviceRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.domain.notification.repository.NotificationRepository;
import com.sss.tally.global.error.ErrorCode;

import lombok.extern.slf4j.Slf4j;

@Transactional
@Slf4j
@Service
public class NotificationServiceImpl implements NotificationService {

	private final NotificationRepository notificationRepository;

	private final DeviceRepository deviceRepository;

	private final MemberRepository memberRepository;

	private final PaymentRepository paymentRepository;

	private final MemberPaymentRepository memberPaymentRepository;

	@Autowired
	public NotificationServiceImpl(NotificationRepository notificationRepository, DeviceRepository deviceRepository,
		MemberRepository memberRepository, PaymentRepository paymentRepository, MemberPaymentRepository memberPaymentRepository) {
		this.notificationRepository = notificationRepository;
		this.deviceRepository = deviceRepository;
		this.memberRepository = memberRepository;
		this.paymentRepository = paymentRepository;
		this.memberPaymentRepository = memberPaymentRepository;

	}

	@Value("${fcm.key.path}")
	private String FCM_PRIVATE_KEY_PATH;

	// 메시징만 권한 설정
	@Value("${fcm.key.scope}")
	private String fireBaseScope;

	// fcm 기본 설정 진행
	@PostConstruct
	public void init() {
		try {
			FirebaseOptions options = FirebaseOptions.builder()
				.setCredentials(
					GoogleCredentials
						.fromStream(new ClassPathResource(FCM_PRIVATE_KEY_PATH).getInputStream())
						.createScoped(List.of(fireBaseScope)))
				.build();
			if (FirebaseApp.getApps().isEmpty()) {
				FirebaseApp.initializeApp(options);
			}
		} catch (IOException e) {
			// spring 뜰때 알림 서버가 잘 동작하지 않는 것이므로 바로 죽임
			throw new RuntimeException(e.getMessage());
		}
	}

	// 알림 여러곳에 보내기
	@Override
	public List<NotificationDto.NotificationRespDto> sendNotificationList(
		List<NotificationDto.NotificationReqDto> notificationReqDtos) {
		for (NotificationDto.NotificationReqDto notificationReqDto : notificationReqDtos) {
			List<Device> optionalDeviceList = deviceRepository.findDevicesByDeviceTokenAndDeviceStatusIsTrueAndIsLoginIsTrue(
				notificationReqDto.getToken());
			if (optionalDeviceList.isEmpty()) {
				throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
			}
		}

		List<Message> messages = new ArrayList<>();
		List<NotificationDto.NotificationRespDto> notificationRespDtoList = new ArrayList<>();

		for (NotificationDto.NotificationReqDto notificationReqDto : notificationReqDtos) {
			Message message = Message.builder()
				.putData("time", LocalDateTime.now().toString())
				.setNotification(Notification.builder()
					.setTitle(notificationReqDto.getTitle())
					.setBody(notificationReqDto.getContent())
					.build())
				.setToken(notificationReqDto.getToken())
				.build();

			messages.add(message);
			notificationRespDtoList.add(NotificationDto.NotificationRespDto.of(1, notificationReqDto));
		}

		BatchResponse response;
		try {

			// 알림 발송
			response = FirebaseMessaging.getInstance().sendEach(messages);
			List<NotificationDto.NotificationRespDto> notificationRespDtofailList = new ArrayList<>();
			// 요청에 대한 응답 처리
			if (response.getFailureCount() > 0) {
				List<SendResponse> responses = response.getResponses();

				for (int i = 0; i < responses.size(); i++) {
					if (!responses.get(i).isSuccessful()) {
						notificationRespDtofailList.add(NotificationDto.NotificationRespDto.of(
							-1, notificationReqDtos.get(i)));
					}
				}
				return notificationRespDtofailList;
			}
			return notificationRespDtoList;
		} catch (FirebaseMessagingException e) {
			throw new NotificationException(ErrorCode.FAIL_SEND_NOTIFICATION);
		}
	}

	public NotificationDto.NotificationRespDto sendNotificationToPayer(Member member, String paymentUuid){
		Optional<Payment> paymentOptional = paymentRepository.findPaymentByPaymentUuidAndStatusIsFalse(paymentUuid);
		if(paymentOptional.isEmpty()) throw new PaymentException(ErrorCode.NOT_EXIST_PAYMENT);

		Optional<Device> deviceOptional = deviceRepository.findDeviceByMemberIdAndIsLoginIsTrue(paymentOptional.get().getMemberId());
		if(deviceOptional.isEmpty()) {log.error("결제자가 로그인 한 device가 없습니다."); return null;}

		if(!memberPaymentRepository.existsByPaymentIdAndMemberIdAndStatusIsFalse(paymentOptional.get(), member))
			throw new BusinessException(ErrorCode.NOT_EXIST_REQUEST_PERMISSION);

		if(member.getMemberId().equals(paymentOptional.get().getMemberId().getMemberId()))
			throw new BusinessException(ErrorCode.NOT_EXIST_REQUEST_PERMISSION);

		// DB에 저장하기
		com.sss.tally.domain.notification.document.Notification notification = com.sss.tally.domain.notification.document.Notification.of("payment-request", member.getMemberUuid(),
				member.getNickname(), deviceOptional.get().getMemberId().getMemberUuid(), deviceOptional.get().getMemberId().getNickname(), paymentOptional.get().getTravelId().getTravelTitle(), paymentOptional.get().getPaymentName());
		notificationRepository.save(notification);


		NotificationDto.NotificationReqDto notificationReqDto = NotificationDto.NotificationReqDto.of(deviceOptional.get(),
				member.getNickname() + " 님이 " + paymentOptional.get().getTravelId().getTravelTitle() + "의 <" + paymentOptional.get().getPaymentName()+ "> 금액 조정을 요청했습니다.", "금액 수정 요청");

		NotificationDto.NotificationRespDto notificationRespDto = sendNotification(notificationReqDto);

		// 실패했다면 다시 보내주기
		if(notificationRespDto.getCode() == -1)
			return sendNotification(notificationReqDto);
		else
			return notificationRespDto;
	}

	@Override
	public NotificationDto.NotificationRespDto sendNotification(NotificationDto.NotificationReqDto notificationReqDto) {
		List<Device> optionalDeviceList = deviceRepository.findDevicesByDeviceTokenAndDeviceStatusIsTrueAndIsLoginIsTrue(
			notificationReqDto.getToken());
		if (optionalDeviceList.isEmpty()) {
			throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
		}

		Message message = Message.builder()
			.putData("time", LocalDateTime.now().toString())
			.setNotification(Notification.builder()
				.setTitle(notificationReqDto.getTitle())
				.setBody(notificationReqDto.getContent())
				.build())
			.setToken(notificationReqDto.getToken())
			.build();

		try {
			FirebaseMessaging.getInstance().send(message);
			return NotificationDto.NotificationRespDto.of(1,
				notificationReqDto);
		} catch (FirebaseMessagingException e) {
			throw new NotificationException(ErrorCode.FAIL_SEND_NOTIFICATION);
		}

	}

	@Override
	public List<NotificationDto.GetNotificationRespDto> getNotification(String memberUuid) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		List<com.sss.tally.domain.notification.document.Notification> notificationList = notificationRepository.findByReceiverUuid(
			memberUuid);
		List<NotificationDto.GetNotificationRespDto> getNotificationRespDtoList = new ArrayList<>();
		for (com.sss.tally.domain.notification.document.Notification notification : notificationList) {
			NotificationDto.GetNotificationRespDto getNotificationRespDto = NotificationDto.GetNotificationRespDto.from(
				notification);

			getNotificationRespDtoList.add(getNotificationRespDto);
		}

		return getNotificationRespDtoList;
	}
}
