package com.sss.tally.domain.notification.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

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
import com.sss.tally.domain.notification.repository.NotificationRepository;

import lombok.extern.slf4j.Slf4j;

@Transactional
@Slf4j
@Service
public class NotificationServiceImpl implements NotificationService {

	private final NotificationRepository notificationRepository;

	@Autowired
	public NotificationServiceImpl(NotificationRepository notificationRepository) {
		this.notificationRepository = notificationRepository;
	}

	@Value("${FCM_KEY_PATH}")
	private String FCM_PRIVATE_KEY_PATH;

	//
	// 메시징만 권한 설정
	@Value("${FCM_KEY_SCOPE}")
	private String fireBaseScope;

	// fcm 기본 설정 진행
	@PostConstruct
	public void init() {
		try {
			FirebaseOptions options = new FirebaseOptions.Builder()
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
			response = FirebaseMessaging.getInstance().sendAll(messages);
			List<NotificationDto.NotificationRespDto> notificationRespDtofailList = new ArrayList<>();
			// 요청에 대한 응답 처리
			if (response.getFailureCount() > 0) {
				List<SendResponse> responses = response.getResponses();
				List<String> failedTokens = new ArrayList<>();

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
			throw new IllegalArgumentException("알림 전송 실패" + e.getMessage());
		}
	}

	@Override
	public NotificationDto.NotificationRespDto sendNotification(NotificationDto.NotificationReqDto notificationReqDto) {

		Message message = Message.builder()
			.putData("time", LocalDateTime.now().toString())
			.setNotification(Notification.builder()
				.setTitle(notificationReqDto.getTitle())
				.setBody(notificationReqDto.getContent())
				.build())
			.setToken(notificationReqDto.getToken())
			.build();

		try {
			String response = FirebaseMessaging.getInstance().send(message);
			NotificationDto.NotificationRespDto notificationRespDto = NotificationDto.NotificationRespDto.of(1,
				notificationReqDto);
			return notificationRespDto;
		} catch (FirebaseMessagingException e) {
			throw new IllegalArgumentException("알림 전송 실패" + e.getMessage());
		}

	}

	@Override
	public List<NotificationDto.GetNotificationRespDto> getNotification(String memberUuid) {
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
