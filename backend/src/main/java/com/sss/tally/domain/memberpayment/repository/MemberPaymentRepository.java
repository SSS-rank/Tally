package com.sss.tally.domain.memberpayment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.memberpayment.entity.MemberPayment;
import com.sss.tally.domain.payment.entity.Payment;

public interface MemberPaymentRepository extends JpaRepository<MemberPayment, Long> {
	List<MemberPayment> findMemberPaymentsByPaymentIdAndStatusIsFalse(Payment payment);
	Optional<MemberPayment> findMemberPaymentsByPaymentIdAndMemberId(Payment payment, Member member);
	boolean existsByPaymentIdAndMemberIdAndStatusIsTrue(Payment paymentId, Member memberId);
	List<MemberPayment> findMemberPaymentsByPaymentIdAndMemberIdAndStatusIsFalse(Payment payment, Member member);

	List<MemberPayment> findMemberPaymentsByPaymentId_PaymentUuid(String paymentUuid);
}
