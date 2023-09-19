package com.sss.tally.api.notification.dto;

import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.device.entity.Device;
import com.sss.tally.domain.notification.document.Notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

public class NotificationDto {
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class NotificationReqDto {

		@NonNull
		private String title;
		@NonNull
		private String content;
		@NonNull
		private String token;

		public static NotificationDto.NotificationReqDto of(Device device, String content, String title) {
			return NotificationReqDto.builder()
				.content(content)
				.title(title)
				.token(device.getDeviceToken())
				.build();

		}

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

		private String createdTime;

		public static GetNotificationRespDto from(Notification notification) {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			String formattedTime = notification.getCreatedTime().format(formatter);
			return GetNotificationRespDto.builder()
				.type(notification.getType())
				.senderName(notification.getSenderName())
				.receiverName(notification.getReceiverName())
				.travelName(notification.getTravelName())
				.createdTime(formattedTime)
				.build();
		}

	}
}
