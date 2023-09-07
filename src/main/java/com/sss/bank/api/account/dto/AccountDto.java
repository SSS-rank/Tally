package com.sss.bank.api.account.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class AccountDto {

	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	public static class AccountCreateReqDto {

		@NotNull
		private String bankCode;
		@NotNull
		@Size(max = 4)
		private String accountPassword;

	}

	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	public static class AccountDeleteReqDto {
		@NotNull
		@NotEmpty
		private String accountHolderUuid;
		@NotNull
		private String bankCode;
		@NotNull
		private String accountNum;
		@NotNull
		private String accountPassword;
	}
}
