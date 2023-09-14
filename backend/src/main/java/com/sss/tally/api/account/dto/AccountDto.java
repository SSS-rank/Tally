package com.sss.tally.api.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccountDto {
	@Getter
	@Builder
	public static class AccountCreateReqDto{
		private String accountNumber;
	}

}
