package com.sss.tally.api.account.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccountDto {
	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class AccountCreateReqDto{
		@NotBlank
		private String accountNumber;
		@NotNull
		private String bankName;
		@NotNull
		private int orderNumber;

		private String transferPassword;
	}
}
