package com.sss.tally.domain.account.service;

import java.security.NoSuchAlgorithmException;

import org.springframework.security.core.Authentication;

import com.sss.tally.api.account.dto.AccountDto;

public interface AccountService {
	void createAccount(Authentication authentication, AccountDto.AccountCreateReqDto accountCreateReqDto) throws
		NoSuchAlgorithmException;
}
