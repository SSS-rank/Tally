package com.sss.tally.domain.grouppayment.repository;

import java.util.List;

import com.sss.tally.domain.travel.entity.Travel;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.caculategroup.entity.CalculateGroup;
import com.sss.tally.domain.grouppayment.entity.GroupPayment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GroupPaymentRepository extends JpaRepository<GroupPayment, Integer> {
	List<GroupPayment> findGroupPaymentsByCalculateGroupId(CalculateGroup calculateGroup);

	@Query("SELECT gp FROM GroupPayment gp " +
			"JOIN gp.paymentId p " +
			"WHERE p.travelId = :travel AND gp.calculateGroupId = :calculateGroup AND p.status = false")
	List<GroupPayment> findGroupPaymentsByCalculateGroupIdAndTravel(@Param("calculateGroup") CalculateGroup calculateGroup, @Param("travel") Travel travel);




}
