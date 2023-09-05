package com.sss.bank.domain.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.bank.domain.account.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
	Account findAccountByAccountNumberAndStatusIsFalse(String accountNum);
}
