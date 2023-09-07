package com.sss.bank.api.account.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.bank.domain.account.entity.Account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class AccountDto {
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
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

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	public static class AccountDeleteReqDto {
		@NotNull
		private String bankCode;
		@NotNull
		private String accountNum;
		@NotNull
		private String accountPassword;
	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	public static class AccountGetBalanceReqDto {

		@NotNull
		@NotEmpty
		@Size(max = 5)
		private String accountPassword;

		@NotNull
		@NotEmpty
		@Size(max = 20)
		private String accountNum;

	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@Getter
	public static class AccountGetBalanceRespDto {

		private String bankName;

		private String accountNumber;

		private Long balance;

		public static AccountGetBalanceRespDto from(Account account) {
			return AccountGetBalanceRespDto.builder()
				.balance(account.getBalance())
				.bankName(account.getBankId().getBankName())
				.accountNumber(account.getAccountNumber())
				.build();
		}
	}

}
