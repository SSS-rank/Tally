package com.sss.tally.domain.account.service;

import org.springframework.stereotype.Service;

import com.sss.tally.api.account.dto.AccountDto;
import com.sss.tally.domain.account.entity.Account;
import com.sss.tally.domain.account.repository.AccountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{
	private final AccountRepository accountRepository;
	@Override
	public void createAccount(AccountDto.AccountCreateReqDto accountCreateReqDto) {
		accountRepository.save(Account.from(accountCreateReqDto));
	}
}
