package com.sss.tally.domain.paymentunit.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.paymentunit.entity.PaymentUnit;

public interface PaymentUnitRepository extends JpaRepository<PaymentUnit, Long> {
	Optional<PaymentUnit> findPaymentUnitByPaymentUnitId(Long paymentUnitId);
}
