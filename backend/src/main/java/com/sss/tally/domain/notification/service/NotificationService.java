package com.sss.tally.domain.notification.service;

import java.util.List;

import com.sss.tally.api.notification.dto.NotificationDto;
import com.sss.tally.domain.member.entity.Member;

public interface NotificationService {
	public List<NotificationDto.NotificationRespDto> sendNotificationList(
		List<NotificationDto.NotificationReqDto> notificationReqDtos);

	public NotificationDto.NotificationRespDto sendNotification(NotificationDto.NotificationReqDto notificationReqDto);

	List<NotificationDto.GetNotificationRespDto> getNotification(String memberUuid);

	NotificationDto.NotificationRespDto sendNotificationToPayer(Member member, String paymentUuid);
}
