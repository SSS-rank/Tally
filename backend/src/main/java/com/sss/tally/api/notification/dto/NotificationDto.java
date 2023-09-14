package com.sss.tally.api.notification.dto;

import java.time.LocalDateTime;

import com.sss.tally.domain.notification.document.Notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

public class NotificationDto {

	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class NotificationReqDto {

		@NonNull
		private String title;
		@NonNull
		private String content;
		@NonNull
		private String token;

	}

	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class NotificationRespDto {

		private int code;

		private NotificationDto.NotificationReqDto notificationReqDto;

		public static NotificationRespDto of(int code, NotificationReqDto notificationReqDto) {
			return NotificationRespDto.builder()
				.code(code)
				.notificationReqDto(notificationReqDto)
				.build();
		}
	}

	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class GetNotificationRespDto {

		private String type;

		private String senderName;

		private String receiverName;

		private String travelName;

		private LocalDateTime createdTime;

		public static GetNotificationRespDto from(Notification notification) {
			return GetNotificationRespDto.builder()
				.type(notification.getType())
				.senderName(notification.getSenderName())
				.receiverName(notification.getReceiverName())
				.travelName(notification.getTravelName())
				.createdTime(notification.getCreatedTime())
				.build();
		}
	}

}
