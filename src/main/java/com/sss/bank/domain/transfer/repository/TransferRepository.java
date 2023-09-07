package com.sss.bank.domain.transfer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.bank.domain.transfer.entity.Transfer;

public interface TransferRepository extends JpaRepository<Transfer, Long> {
	
}
