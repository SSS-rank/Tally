package com.sss.bank.domain.transfer.repository;

import java.util.List;
import java.util.Map;

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

	@Query(value = "SELECT * FROM (" +
		"(SELECT account_id AS accountId, shop_name AS withdrawAccountContent, payment_uuid AS uuid, amount AS amount, payment_date AS date, NULL AS name, NULL AS receiver "
		+
		"FROM payment p INNER JOIN shop s ON p.shop_id = s.shop_id WHERE account_id = :accountId)" +
		" UNION ALL " +
		"(SELECT sender AS accountId, withdraw_account_content, transfer_uuid AS uuid, amount AS amount, transfer_date AS date,  deposit_account_content AS name, receiver "
		+
		"FROM transfer WHERE sender = :accountId OR receiver = :accountId)" +
		") AS combined " +
		"ORDER BY combined.date DESC " +
		"LIMIT :limit OFFSET :offset", nativeQuery = true)
	List<Map<String, Object>> findTransferPaymentList(@Param("accountId") long accountId, @Param("limit") int limit,
		@Param("offset") int offset);
}
