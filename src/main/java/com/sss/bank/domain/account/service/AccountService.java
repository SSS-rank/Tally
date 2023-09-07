package com.sss.bank.domain.account.service;

import com.sss.bank.api.account.dto.AccountDto;

public interface AccountService {
	Boolean createAccount(long memberId, AccountDto.AccountCreateReqDto accountCreateReqDto);

	Boolean deleteAccount(AccountDto.AccountDeleteReqDto accountDeleteReqDto, long memberUuid);
}
