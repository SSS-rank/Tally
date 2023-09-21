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

import com.sss.tally.api.payment.dto.PaymentDto;
import com.sss.tally.domain.category.entity.Category;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.paymentunit.entity.PaymentUnit;
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
	@JoinColumn(name = "travel_id")
	private Travel travelId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category categoryId;

	@Column(nullable = false)
	private int amount;

	@Column(nullable = false)
	private Double ratio;

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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "payment_unit_id")
	private PaymentUnit paymentUnitId;

	@Column(nullable = false)
	private Boolean visible;

	@Column(nullable = false)
	private Boolean status;

	@Column(nullable = false)
	private String paymentName;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private CalculateStatusEnum calculateStatus;


	public static Payment of(PaymentDto.PaymentManualDto payPaymentManualDto, Member member, Travel travel, Category category, PaymentUnit paymentUnit, String uuid, PaymentMethodEnum paymentMethod, LocalDateTime dateTime){
		return Payment.builder()
			.memberId(member)
			.travelId(travel)
			.paymentUnitId(paymentUnit)
			.categoryId(category)
			.paymentUuid(uuid)
			.amount(payPaymentManualDto.getAmount())
			.paymentLocalDate(dateTime)
			.paymentKoreaDate(dateTime)
			.paymentMemo(payPaymentManualDto.getMemo())
			.paymentMethod(paymentMethod)
			.ratio(payPaymentManualDto.getRatio())
			.visible(payPaymentManualDto.isVisible())
			.paymentName(payPaymentManualDto.getTitle())
			.calculateStatus(CalculateStatusEnum.NONE)
			.status(false)
			.build();
	}

	public void updateCalculateStatusEnum(CalculateStatusEnum calculateStatus) {
		this.calculateStatus = calculateStatus;
	}

	public void updateMemo(String memo){
		this.paymentMemo = memo;
	}

	public void updatePayment(int amount, Double ratio, PaymentUnit paymentUnitId, Category category, LocalDateTime paymentDateTime, String memo, boolean visible, String title){
		this.paymentName = title;
		this.amount = amount;
		this.ratio = ratio;
		this.categoryId = category;
		this.paymentUnitId = paymentUnitId;
		this.paymentLocalDate = paymentDateTime;
		this.paymentKoreaDate = paymentDateTime;
		this.paymentMemo = memo;
		this.visible = visible;
	}

	public void updatePaymentAuto(PaymentDto.PaymentCardUpdateDto paymentCardUpdateDto, Category category){
		this.categoryId = category;
		this.paymentMemo = paymentCardUpdateDto.getMemo();
		this.visible = paymentCardUpdateDto.isVisible();
	}

	public static Payment of(PaymentDto.PaymentListRespDto paymentListRespDto, Member member, Travel travel, Category category, PaymentUnit paymentUnit, LocalDateTime datetime){
		return Payment.builder()
			.paymentName(paymentListRespDto.getContent())
			.amount(paymentListRespDto.getAmount())
			.memberId(member)
			.travelId(travel)
			.ratio(1.0)
			.categoryId(category)
			.paymentUuid(paymentListRespDto.getTransferUuid())
			.paymentMethod(PaymentMethodEnum.CARD)
			.paymentUnitId(paymentUnit)
			.visible(true)
			.status(false)
			.paymentMemo("")
			.paymentKoreaDate(datetime)
			.paymentLocalDate(datetime)
			.calculateStatus(CalculateStatusEnum.NONE)
			.build();
	}
}
