package com.sss.tally.api.paymentunit.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.paymentunit.entity.PaymentUnit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PaymentUnitDto {
	private Long paymentUnitId;
	private String countryName;
	private String unit;

	public static PaymentUnitDto from(PaymentUnit paymentUnit){
		return PaymentUnitDto.builder()
			.paymentUnitId(paymentUnit.getPaymentUnitId())
			.countryName(paymentUnit.getCountryName())
			.unit(paymentUnit.getUnit())
			.build();
	}
}
