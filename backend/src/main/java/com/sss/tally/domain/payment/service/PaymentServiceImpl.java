package com.sss.tally.domain.payment.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.memberpayment.dto.MemberPaymentDto;
import com.sss.tally.api.payment.dto.PaymentDto;
import com.sss.tally.domain.category.entity.Category;
import com.sss.tally.domain.category.repository.CategoryRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.domain.memberpayment.entity.MemberPayment;
import com.sss.tally.domain.memberpayment.repository.MemberPaymentRepository;
import com.sss.tally.domain.payment.entity.Payment;
import com.sss.tally.domain.payment.entity.PaymentMethodEnum;
import com.sss.tally.domain.payment.repository.PaymentRepository;
import com.sss.tally.domain.paymentunit.entity.PaymentUnit;
import com.sss.tally.domain.paymentunit.repository.PaymentUnitRepository;
import com.sss.tally.domain.travel.entity.Travel;
import com.sss.tally.domain.travel.repository.TravelRepository;
import com.sss.tally.domain.travelgroup.repository.TravelGroupRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.CategoryException;
import com.sss.tally.global.error.exception.MemberException;
import com.sss.tally.global.error.exception.PaymentException;
import com.sss.tally.global.error.exception.TravelException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService{
	private final PaymentRepository paymentRepository;
	private final MemberRepository memberRepository;
	private final TravelRepository travelRepository;
	private final CategoryRepository categoryRepository;
	private final PaymentUnitRepository paymentUnitRepository;
	private final MemberPaymentRepository memberPaymentRepository;
	private final TravelGroupRepository travelGroupRepository;

	public void createPayment(Authentication authentication, PaymentDto.PaymentManualDto paymentManualDto) {
		Member member = (Member) authentication.getPrincipal();

		Optional<Member> memberOptional = memberRepository.findByMemberUuid(member.getMemberUuid());
		if(memberOptional.isEmpty()) throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(paymentManualDto.getTravelId());
		if(travelOptional.isEmpty()) throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);

		Optional<Category> category = categoryRepository.findCategoryByCategoryId(paymentManualDto.getCategory());
		if(category.isEmpty()) throw new CategoryException(ErrorCode.NOT_EXIST_CATEGORY);

		Optional<PaymentUnit> paymentUnit = paymentUnitRepository.findPaymentUnitByPaymentUnitId(
			paymentManualDto.getPaymentUnitId());
		if(paymentUnit.isEmpty()) throw new PaymentException(ErrorCode.NOT_EXIST_PAYMENT_UNIT);

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(paymentManualDto.getPaymentDateTime(), formatter);

		String uuid = UUID.randomUUID().toString();

		PaymentMethodEnum paymentMethodEnum = null;
		if(paymentManualDto.getPaymentType().equals("card"))
			paymentMethodEnum = PaymentMethodEnum.CARD;
		else if(paymentManualDto.getPaymentType().equals("cash"))
			paymentMethodEnum = PaymentMethodEnum.CASH;

		Payment save = paymentRepository.save(
			Payment.of(paymentManualDto, member, travelOptional.get(), category.get(), paymentUnit.get(), uuid,
				paymentMethodEnum, dateTime));

		for(MemberPaymentDto.MemberPaymentCreateDto participant :paymentManualDto.getPaymentParticipants()){
			Optional<Member> partOptional = memberRepository.findByMemberUuid(participant.getMemberUuid());
			if(partOptional.isEmpty()) throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

			memberPaymentRepository.save(MemberPayment.of(participant, partOptional.get(), save));
		}
	}

	@Override
	public void modifyMemo(Authentication authentication, PaymentDto.PaymentMemoDto paymentMemoDto) {
		Member member = (Member) authentication.getPrincipal();

		Optional<Member> memberOptional = memberRepository.findByMemberUuid(member.getMemberUuid());
		if(memberOptional.isEmpty()) throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(paymentMemoDto.getTravelId());
		if(travelOptional.isEmpty()) throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);

		if(!travelGroupRepository.existsByTravelIdAndMemberId(travelOptional.get(), memberOptional.get()))
			throw new TravelException(ErrorCode.NOT_EXIST_PARTICIPANT);

		Optional<Payment> paymentOptional = paymentRepository.findPaymentByPaymentUuidAndStatusIsFalse(paymentMemoDto.getPaymentUuid());
		if(paymentOptional.isEmpty()) throw new PaymentException(ErrorCode.NOT_EXIST_PAYMENT);


		if(!memberPaymentRepository.existsByPaymentIdAndMemberIdAndStatusIsTrue(paymentOptional.get(), memberOptional.get()))
			throw new PaymentException(ErrorCode.NOT_EXIST_PARTICIPANT);

		paymentOptional.get().updateMemo(paymentMemoDto.getMemo());


	}
}