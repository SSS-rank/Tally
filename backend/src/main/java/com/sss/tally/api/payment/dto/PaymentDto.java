package com.sss.tally.api.payment.dto;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.api.memberpayment.dto.MemberPaymentDto;

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
	public static class PaymentManualDto{

		@NotNull
		private Long travelId;

		@NotNull
		private int amount;
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
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PaymentListRespDto{
		private String transferDate;
		private String flag;
		private int amount;
		private String content;
		private String transferUuid;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static class PaymentRespDto{
		private String paymentDate;
		private int amount;
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
		private int amount;

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

}
