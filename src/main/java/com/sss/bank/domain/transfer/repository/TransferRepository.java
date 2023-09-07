package com.sss.bank.domain.transfer.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sss.bank.domain.account.entity.Account;
import com.sss.bank.domain.transfer.entity.Transfer;

public interface TransferRepository extends JpaRepository<Transfer, Long> {

	@Query("SELECT t FROM Transfer t WHERE t.sender = :account OR t.receiver = :account")
	Page<Transfer> findTransfersByDepositAccountIdOrWithdrawAccountId(@Param("account") Account account,
		Pageable pageable);

}
