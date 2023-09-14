package com.sss.bank.api.payment.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PaymentDto {

	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PaymentReqDto {

		@NotBlank
		@Size(max = 20)
		private String senderAccountNum;

		@NotNull
		private Long shopId;

		@NotNull
		@Min(1)
		private Long paymentAmount;

		@NotBlank
		private String password;

	}

	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PaymentRespDto {

		private String shopName;

		private Long balance;

		public static PaymentRespDto of(String shopName, Long balance) {
			return PaymentRespDto.builder()
				.shopName(shopName)
				.balance(balance)
				.build();
		}
	}
}