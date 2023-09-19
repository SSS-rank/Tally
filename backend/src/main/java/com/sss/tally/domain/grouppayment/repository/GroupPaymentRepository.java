package com.sss.tally.domain.grouppayment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.caculategroup.entity.CalculateGroup;
import com.sss.tally.domain.grouppayment.entity.GroupPayment;

public interface GroupPaymentRepository extends JpaRepository<GroupPayment, Integer> {
	List<GroupPayment> findGroupPaymentsByCalculateGroupId(CalculateGroup calculateGroup);
}
