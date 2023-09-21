package com.sss.tally.domain.memberpayment.entity;

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

import com.sss.tally.api.memberpayment.dto.MemberPaymentDto;
import com.sss.tally.domain.member.entity.Member;
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
public class MemberPayment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberPaymentId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member memberId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "payment_id")
	private Payment paymentId;

	@Column(nullable = false)
	private int amount;

	@Column(nullable = false)
	private Boolean status;

	@Column(nullable = false)
	private LocalDateTime paymentDate;

	@CreatedDate
	private LocalDateTime createDate;

	public static MemberPayment of(MemberPaymentDto.MemberPaymentCreateDto memberPaymentCreateDto, Member member, Payment payment){
		return MemberPayment.builder()
			.paymentDate(payment.getPaymentLocalDate())
			.memberId(member)
			.amount(memberPaymentCreateDto.getAmount())
			.status(true)
			.paymentId(payment)
			.build();
	}

	public void updateStatus(boolean status){
		this.status = status;
	}

	public void updateMemberPayment(int amount, boolean status){
		this.amount = amount;
		this.status = status;
	}

}