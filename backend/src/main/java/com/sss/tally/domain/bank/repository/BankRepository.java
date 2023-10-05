package com.sss.tally.domain.bank.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.bank.entity.Bank;

public interface BankRepository extends JpaRepository<Bank, String> {
	Optional<Bank> findBankByBankCode(String bankCode);
}
