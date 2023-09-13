package com.sss.tally.domain.account.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.account.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
	Optional<Account> findAccountByAccountNumberAndStatusIsFalse(String accountNumber);

	Optional<Account> findAccountByAccountIdAndStatusIsFalse(Long accountId);

	List<Account> findAllByMemberId_MemberUuid(String memberUuid);
}
