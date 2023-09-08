package com.sss.bank.domain.payment.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.sss.bank.api.payment.dto.PaymentDto;
import com.sss.bank.domain.account.entity.Account;
import com.sss.bank.domain.shop.entity.Shop;

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

	@Column(nullable = false, unique = true)
	private String paymentUuid;

	@JoinColumn(name = "account_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Account accountId;

	@JoinColumn(name = "shop_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Shop shopId;

	@Column(nullable = false)
	private Long amount;

	@CreatedDate
	@Column(nullable = false)
	private LocalDateTime paymentDate;

	public static Payment of(PaymentDto.PaymentReqDto paymentReqDto, String uuid, Account account, Shop shop) {
		return Payment.builder()
			.accountId(account)
			.paymentUuid(uuid)
			.shopId(shop)
			.amount(paymentReqDto.getPaymentAmount())
			.build();
	}

}
