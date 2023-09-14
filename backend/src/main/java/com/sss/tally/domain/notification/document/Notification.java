package com.sss.tally.domain.notification.document;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Document(collection = "tally")
@Builder
@AllArgsConstructor
public class Notification {
	@Id
	private String id;

	private String type;

	private String senderUuid;

	private String senderName;

	private String receiverUuid;

	private String receiverName;

	private String travelName;

	@CreatedDate
	private LocalDateTime createdTime;

	public static Notification of(String type, String senderUuid, String senderName, String receiverUuid,
		String receiverName
		, String travelName) {
		return Notification.builder()
			.type(type)
			.senderName(senderName)
			.senderUuid(senderUuid)
			.receiverName(receiverName)
			.receiverUuid(receiverUuid)
			.travelName(travelName)
			.build();
	}

}
