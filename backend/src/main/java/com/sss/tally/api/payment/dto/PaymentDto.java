package com.sss.tally.api.payment.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.api.memberpayment.dto.MemberPaymentDto;
import com.sss.tally.domain.payment.entity.Payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class PaymentDto {

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PaymentListDto{
		private String paymentUuid;
		private Long categoryId;
		private Long amount;
		private String payer;
		private String paymentDate;
		private String paymentMemo;
		private String paymentMethod;
		private String paymentUnit;
		private boolean visible;
		private String paymentName;
		private String calculateStatus;
		private List<String> participants;

		public static PaymentListDto of(Payment payment, List<String> participants, Long amount){
			DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH:mm");
			String dateTime = payment.getPaymentKoreaDate().format(dateTimeFormatter);

			return PaymentListDto.builder()
				.paymentUuid(payment.getPaymentUuid())
				.categoryId(payment.getCategoryId().getCategoryId())
				.amount(amount)
				.paymentDate(dateTime)
				.payer(payment.getMemberId().getMemberUuid())
				.participants(participants)
				.paymentMemo(payment.getPaymentMemo())
				.paymentMethod(payment.getPaymentMethod().toString())
				.paymentUnit(payment.getPaymentUnitId().getUnit())
				.paymentName(payment.getPaymentName())
				.calculateStatus(payment.getCalculateStatus().toString())
				.visible(payment.getVisible())
				.build();
		}
	}



	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PaymentManualDto{

		@NotNull
		private Long travelId;

		@NotNull
		private Long amount;
		@NotNull
		private Double ratio;
		@NotNull
		private Long paymentUnitId;

		private Long category;
		@NotNull
		private String paymentDateTime;

		private String memo;
		@NotNull
		private boolean visible;

		private String paymentType;

		private String title;

		private List<MemberPaymentDto.MemberPaymentCreateDto> paymentParticipants;
	}
	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PaymentMemoDto{
		@NotNull
		private Long travelId;
		@NotNull
		private String paymentUuid;
		@NotNull
		private String memo;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static  class PaymentListReqDto{
		private String account_num;
		private String account_passwd;
		private String start_date;
		private String end_date;

		public static PaymentListReqDto from(String accountNum, String accountPasswd, String startDate, String endDate){
			return PaymentListReqDto.builder()
				.account_num(accountNum)
				.account_passwd(accountPasswd)
				.start_date(startDate)
				.end_date(endDate)
				.build();
		}
	}
	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PaymentResDto{
		List<PaymentListRespDto> tranferList;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PaymentListRespDto{
		private String transferDate;
		private String flag;
		private Long amount;
		private String content;
		private String transferUuid;
		private Integer shopType;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static class PaymentRespDto{
		private String paymentDate;
		private Long amount;
		private String paymentName;
		private String paymentUuid;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PaymentUpdateDto{

		@NotNull
		private String paymentUuid;

		@NotNull
		private Long travelId;

		@NotNull
		private Long amount;

		@NotNull
		private Double ratio;

		@NotNull
		private Long paymentUnitId;

		@NotNull
		private Long category;

		@NotNull
		private String paymentDateTime;

		@NotNull
		private String memo;
		@NotNull
		private boolean visible;

		@NotNull
		private String title;
		@NotNull
		private List<MemberPaymentDto.MemberPaymentCreateDto> paymentParticipants;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PaymentCardUpdateDto{

		@NotNull
		private String paymentUuid;

		@NotNull
		private Long travelId;

		@NotNull
		private Long category;

		@NotNull
		private String memo;

		@NotNull
		private boolean visible;

		@NotNull
		private List<MemberPaymentDto.MemberPaymentCreateDto> paymentParticipants;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class RemovePaymentDto{
		private String paymentUuid;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PaymentDetailPayer{
		private String paymentUuid;

		private Long category;

		private String memo;

		private boolean visible;

		private Long amount;

		private String paymentUnit;

		private LocalDateTime paymentDate;

		private String paymentName;

		private List<MemberPaymentDto.MemberPaymentRespDto> paymentParticipants;

		public static PaymentDetailPayer of(Payment payment, List<MemberPaymentDto.MemberPaymentRespDto> participantList) {

			return PaymentDetailPayer.builder()
					.paymentUuid(payment.getPaymentUuid())
					.category(payment.getCategoryId().getCategoryId())
					.memo(payment.getPaymentMemo())
					.visible(payment.getVisible())
					.amount(payment.getAmount())
					.paymentUnit(payment.getPaymentUnitId().getUnit())
					.paymentDate(payment.getPaymentKoreaDate())
					.paymentParticipants(participantList)
					.paymentName(payment.getPaymentName())
					.build();
		}
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PaymentDetailTag{
 		private String paymentUuid;

		private String memo;

		private Long amount;

		private String paymentUnit;

		private String paymentName;

		private List<MemberPaymentDto.MemberPaymentRespDto> paymentParticipants;

		public static PaymentDetailTag of(Payment payment, List<MemberPaymentDto.MemberPaymentRespDto> participantList) {

			return PaymentDetailTag.builder()
					.paymentUuid(payment.getPaymentUuid())
					.memo(payment.getPaymentMemo())
					.amount(payment.getAmount())
					.paymentUnit(payment.getPaymentUnitId().getUnit())
					.paymentName(payment.getPaymentName())
					.paymentParticipants(participantList)
					.build();
		}
	}

}
