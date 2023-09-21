package com.sss.tally.domain.account.service;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.springframework.security.core.Authentication;

import com.sss.tally.api.account.dto.AccountDto;

public interface AccountService {
	void createAccount(Authentication authentication, AccountDto.AccountCreateReqDto accountCreateReqDto) throws
		NoSuchAlgorithmException;

	void deleteAccount(String accountNumber);

	Long getBalance(String accountNumber);

	List<AccountDto.AccountRespDto> getAccountList(Authentication authentication);

	void updateMainAccount(Authentication authentication, String accountNumber);
}
