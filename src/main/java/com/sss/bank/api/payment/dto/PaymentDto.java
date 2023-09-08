package com.sss.bank.api.payment.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PaymentDto {

	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PayementReqDto {

		@NotBlank
		@Size(max = 20)
		private String senderAccountNum;

		@NotBlank
		private Long shopId;

		@NotBlank
		@Min(1)
		private Long paymentAmount;

		@NotBlank
		private String password;

	}

	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PaymentRespDto {

		private String receiverName;

		private Long paymentAmount;

	}
}