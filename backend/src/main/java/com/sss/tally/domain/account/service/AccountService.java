package com.sss.tally.domain.account.service;

import com.sss.tally.api.account.dto.AccountDto;

public interface AccountService {
	void createAccount(AccountDto.AccountCreateReqDto accountCreateReqDto);
}
