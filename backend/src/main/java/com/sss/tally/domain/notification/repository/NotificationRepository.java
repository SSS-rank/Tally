package com.sss.tally.domain.notification.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sss.tally.domain.notification.document.Notification;

public interface NotificationRepository extends MongoRepository<Notification, Integer> {
	List<Notification> findByReceiverUuid(String receiverUuid);
}
