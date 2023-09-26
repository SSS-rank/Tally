package com.sss.tally.domain.memberpayment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.memberpayment.entity.MemberPayment;
import com.sss.tally.domain.payment.entity.Payment;

public interface MemberPaymentRepository extends JpaRepository<MemberPayment, Long> {
	List<MemberPayment> findMemberPaymentsByPaymentIdAndStatusIsFalse(Payment payment);

	Optional<MemberPayment> findMemberPaymentsByPaymentIdAndMemberId(Payment payment, Member member);

	Optional<MemberPayment> findMemberPaymentByPaymentIdAndMemberIdAndStatusIsFalse(Payment payment, Member member);

	boolean existsByPaymentIdAndMemberIdAndStatusIsFalse(Payment paymentId, Member memberId);

	@Query("SELECT mp.memberId.nickname FROM MemberPayment mp WHERE mp.paymentId.paymentId = :paymentId AND mp.status = false")
	List<String> findNicknamesByPaymentId(@Param("paymentId") Long paymentId);

	@Query("SELECT SUM(mp.amount) FROM MemberPayment mp WHERE mp.memberId = :memberId AND mp.paymentId = :paymentId")
	Optional<Long> sumAmountByMemberIdAndPaymentId(@Param("memberId") Member memberId,
		@Param("paymentId") Payment paymentId);

	List<MemberPayment> findMemberPaymentsByPaymentId_PaymentUuid(String paymentUuid);
}
