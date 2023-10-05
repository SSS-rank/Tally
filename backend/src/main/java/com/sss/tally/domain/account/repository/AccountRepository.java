package com.sss.tally.domain.account.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.account.entity.Account;
import com.sss.tally.domain.member.entity.Member;

public interface AccountRepository extends JpaRepository<Account, Long> {
	Optional<Account> findAccountByMemberIdAndStatusIsFalseAndRepresentativeAccountIsTrue(Member member);

	Optional<Account> findAccountByAccountNumberAndStatusIsFalse(String accountNumber);

	List<Account> findAllByMemberIdAndStatusIsFalseOrderByOrderNumberAsc(Member member);
}
