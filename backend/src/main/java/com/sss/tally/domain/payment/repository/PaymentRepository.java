package com.sss.tally.domain.payment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sss.tally.api.calculate.dto.CalculateDto;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.payment.entity.Payment;
import com.sss.tally.domain.travel.entity.Travel;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
	Optional<Payment> findPaymentByPaymentUuidAndStatusIsFalse(String uuid);

	Optional<Payment> findPaymentByPaymentUuid(String paymentUuid);

	@Query("SELECT NEW com.sss.tally.api.calculate.dto.CalculateDto$Detail(" +
		"P.paymentName, " +
		"MP.amount, " +
		"P.amount, " +
		"P.paymentLocalDate) " +
		"FROM Payment P " +
		"INNER JOIN MemberPayment MP ON MP.paymentId = P " +
		"WHERE P = :payment " +
		"AND MP.memberId = :memberId " +
		"AND P.status = false " +
		"AND MP.status = false ")
	CalculateDto.Detail findDetail(@Param("payment") Payment payment, @Param("memberId") Member memberId);

	List<Payment> findPaymentsByTravelIdAndMemberIdAndStatusIsFalseOrderByPaymentKoreaDateDesc(Travel travelId, Member memberId);

	List<Payment> findAllByTravelIdAndMemberIdAndStatusIsFalse(Travel travel, Member member);

	List<Payment> findAllByTravelIdAndMemberIdAndStatusIsFalseAndVisibleIsTrue(Travel travel, Member member);

	List<Payment> findAllByTravelIdAndStatusIsFalseAndVisibleIsFalse(Travel travel);
}
