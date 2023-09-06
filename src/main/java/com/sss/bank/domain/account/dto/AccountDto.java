package com.sss.bank.domain.account.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.sss.bank.domain.account.entity.Account;
import com.sss.bank.domain.bank.entity.Bank;
import com.sss.bank.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class AccountDto {

	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	public static class AccountCreateRequestDto {

		@NotNull
		private String bankCode;
		@NotNull
		@Size(max = 4)
		private String accountPassword;

		public Account toAccountEntity(Member member, String accountNum, String uuid, Bank bank) {
			//	String accountNum = generateAccountNum(dbValue);
			return Account.builder()
				.accountUuid(uuid)
				.accountNumber(accountNum)
				.balance(1000000L)
				.memberId(member)
				.status(false)
				.password(this.accountPassword)
				.bankId(bank)
				.build();
		}
	}
}
