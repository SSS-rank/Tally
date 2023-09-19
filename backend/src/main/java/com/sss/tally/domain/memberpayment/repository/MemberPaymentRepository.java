package com.sss.tally.domain.memberpayment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.memberpayment.entity.MemberPayment;
import com.sss.tally.domain.payment.entity.Payment;

public interface MemberPaymentRepository extends JpaRepository<MemberPayment, Integer> {
	List<MemberPayment> findMemberPaymentsByPaymentId(Payment payment);

	List<MemberPayment> findMemberPaymentsByPaymentIdAndMemberId(Payment payment, Member member);
}
