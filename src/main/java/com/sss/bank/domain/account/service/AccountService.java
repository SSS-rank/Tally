package com.sss.bank.domain.account.service;

import java.security.NoSuchAlgorithmException;

import com.sss.bank.api.account.dto.AccountDto;

public interface AccountService {
	Boolean createAccount(long memberId, AccountDto.AccountCreateReqDto accountCreateReqDto) throws
		NoSuchAlgorithmException;

	Boolean deleteAccount(long memberId, AccountDto.AccountDeleteReqDto accountDeleteReqDto);

	AccountDto.AccountGetBalanceRespDto getBalance(long memberId,
		AccountDto.AccountGetBalanceReqDto accountGetBalanceReqDto);
}
