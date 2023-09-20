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
		private Double amount;
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
		private Long travelId;
		private String paymentUuid;
		private String memo;
	}

}
