package com.sss.tally.domain.grouppayment.entity;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.sss.tally.domain.caculategroup.entity.CalculateGroup;
import com.sss.tally.domain.payment.entity.Payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Getter
@Builder
public class GroupPayment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long groupPaymentId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "payment_id")
	private Payment paymentId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "calculate_group_id")
	private CalculateGroup calculateGroupId;

	public static GroupPayment of(Payment payment, CalculateGroup calculateGroup) {
		return GroupPayment.builder()
			.calculateGroupId(calculateGroup)
			.paymentId(payment)
			.build();
	}

}