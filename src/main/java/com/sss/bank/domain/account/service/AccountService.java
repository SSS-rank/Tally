package com.sss.bank.domain.account.service;

import com.sss.bank.domain.account.dto.AccountDto;

public interface AccountService {
	Boolean createAccount(long memberId, AccountDto.AccountCreateRequestDto accountCreateRequestDto);
}
