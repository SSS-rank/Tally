package com.sss.tally.api.notification.comtroller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.notification.dto.NotificationDto;
import com.sss.tally.domain.notification.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {
	private final NotificationService notificationService;

	@PostMapping
	public ResponseEntity<NotificationDto.NotificationRespDto> sendAlarm(
		@RequestBody NotificationDto.NotificationReqDto notificationReqDto) {
		NotificationDto.NotificationRespDto notificationRespDto = notificationService.sendNotification(
			notificationReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(notificationRespDto);
	}

	@PostMapping("/list")
	public ResponseEntity<List<NotificationDto.NotificationRespDto>> sendAlarmList(
		@RequestBody List<NotificationDto.NotificationReqDto> notificationReqDtos) {
		List<NotificationDto.NotificationRespDto> notificationRespDtos = notificationService.sendNotificationList(
			notificationReqDtos);
		return ResponseEntity.status(HttpStatus.OK).body(notificationRespDtos);
	}

	@GetMapping
	public ResponseEntity<List<NotificationDto.GetNotificationRespDto>> selectAlarm() {
		String memberUuid = "1313";
		List<NotificationDto.GetNotificationRespDto> getNotificationRespDtos = notificationService.getNotification(
			memberUuid);
		return ResponseEntity.status(HttpStatus.OK).body(getNotificationRespDtos);
	}
}
