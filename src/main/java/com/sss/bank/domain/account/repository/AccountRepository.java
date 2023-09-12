package com.sss.bank.domain.account.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sss.bank.domain.account.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
	Optional<Account> findAccountByAccountNumberAndStatusIsFalse(String accountNum);

	@Query("SELECT COUNT(a) FROM Account a")
	Integer countAccountRows();

	List<Account> findAllByMemberId_MemberIdAndBankId_BankIdAndStatusIsFalse
		(Long memberId, Long bankId);

	List<Account> findAllByMemberId_MemberIdAndStatusIsFalse(Long memberId);
}
