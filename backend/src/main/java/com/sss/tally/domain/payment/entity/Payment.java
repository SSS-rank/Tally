package com.sss.tally.domain.payment.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.sss.tally.domain.account.entity.Account;
import com.sss.tally.domain.category.entity.Category;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long paymentId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member memberId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "account_id")
	private Account accountId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "travel_id")
	private Travel travelId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category categoryId;

	@Column(nullable = false)
	private Long amount;

	@Column(nullable = false)
	private String paymentUuid;

	@Column(nullable = false)
	private LocalDateTime paymentLocalDate;

	@CreatedDate
	@Column(nullable = false)
	private LocalDateTime paymentKoreaDate;

	@Column(nullable = false)
	private String paymentMemo;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private PaymentMethodEnum paymentMethod;

	@Column(nullable = false)
	private Boolean visible;

	@Column(nullable = false)
	private Boolean status;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private CalculateStatusEnum calculateStatus;

	public void updateCalculateStatusEnum(CalculateStatusEnum calculateStatus) {
		this.calculateStatus = calculateStatus;
	}

}
