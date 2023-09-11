package com.sss.bank.domain.bank.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.bank.domain.bank.entity.Bank;

public interface BankRepository extends JpaRepository<Bank, Long> {
	Optional<Bank> findBankByBankCode(String bankCode);
}
