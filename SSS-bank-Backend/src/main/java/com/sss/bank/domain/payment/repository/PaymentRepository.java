package com.sss.bank.domain.payment.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.bank.domain.account.entity.Account;
import com.sss.bank.domain.payment.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
	Optional<Payment> findPaymentByPaymentUuid(String paymentUuid);

	List<Payment> findAllByAccountIdAndPaymentDateBetween(Account account, LocalDateTime startDate,
		LocalDateTime endDate);

	List<Payment> findAllByAccountId(Account account);
}
