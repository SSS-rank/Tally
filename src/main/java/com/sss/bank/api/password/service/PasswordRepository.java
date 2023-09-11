package com.sss.bank.api.password.service;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.sss.bank.domain.account.entity.Account;
import com.sss.bank.domain.account.repository.AccountRepository;
import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.AccountException;
import com.sss.bank.global.util.SHA256Util;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class PasswordRepository {
	private final SHA256Util sha256Util;
	private final AccountRepository accountRepository;

	public boolean checkPassword(String accountNumber, String accountPassword) throws NoSuchAlgorithmException {
		Optional<Account> account = accountRepository.findAccountByAccountNumberAndStatusIsFalse(accountNumber);
		if (account.isEmpty())
			throw new AccountException(ErrorCode.NOT_EXIST_ACCOUNT);

		String password = SHA256Util.getEncrypt(accountPassword, account.get().getSalt());
		if (account.get().getPassword().equals(password)) {
			return true;
		}
		return false;
	}

	public boolean checkPasswordTally(String accountNumber, String accountPassword) throws NoSuchAlgorithmException {
		Optional<Account> account = accountRepository.findAccountByAccountNumberAndStatusIsFalse(accountNumber);
		if (account.isEmpty())
			throw new AccountException(ErrorCode.NOT_EXIST_ACCOUNT);
		if (account.get().getPassword().equals(accountPassword)) {
			return true;
		}
		return false;
	}
}
