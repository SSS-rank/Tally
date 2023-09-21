package com.sss.tally.api.account.dto;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.account.entity.Account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class AccountDto {

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class AccountNumberReqDto{
		@NotNull
		String accountNumber;
	}

	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class AccountCreateReqDto{
		@NotBlank
		private String accountNumber;
		@NotNull
		private String bankCode;
		@NotNull
		private int orderNumber;
		@NotNull
		private String accountPassword;

		private String transferPassword;
	}

	@Getter
	@Builder
	public static class AccountRespDto{
		private String accountNumber;
		private String bankCode;
		private String bankName;
		private Long balance;
		public static AccountRespDto of(Account account, Long balance, String bankName){
			return AccountRespDto.builder()
				.accountNumber(account.getAccountNumber())
				.bankCode(account.getBankCode())
				.bankName(bankName)
				.balance(balance)
				.build();
		}
	}

	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class AccountInfoReqDto{
		private String accountNum;
		private String accountPassword;

		public static AccountInfoReqDto of(Account account){
			return AccountInfoReqDto.builder()
				.accountNum(account.getAccountNumber())
				.accountPassword(account.getAccountPassword())
				.build();
		}
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static class AccountInfoRespDto{
		private String bankName;
		private String accountNumber;
		private Long balance;
	}

	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class AccountOrder{
		private String accountNumber;
		private int orderNumber;
	}
	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class AccountOrderReqDto{
		private List<AccountOrder> accountOrder;
	}
}
