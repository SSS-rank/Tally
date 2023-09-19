package com.sss.tally.api.calculate.dto;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class CalculateDto {

	@NoArgsConstructor
	@Getter
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class CalculateCreateReqDto {
		@NotNull
		private String paymentUuid;
	}

}
