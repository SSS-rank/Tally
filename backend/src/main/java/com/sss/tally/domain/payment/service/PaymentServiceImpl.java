package com.sss.tally.domain.payment.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.memberpayment.dto.MemberPaymentDto;
import com.sss.tally.api.payment.dto.PaymentDto;
import com.sss.tally.domain.account.entity.Account;
import com.sss.tally.domain.account.repository.AccountRepository;
import com.sss.tally.domain.category.entity.Category;
import com.sss.tally.domain.category.repository.CategoryRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.domain.memberpayment.entity.MemberPayment;
import com.sss.tally.domain.memberpayment.repository.MemberPaymentRepository;
import com.sss.tally.domain.payment.client.PaymentClient;
import com.sss.tally.domain.payment.entity.Payment;
import com.sss.tally.domain.payment.entity.PaymentMethodEnum;
import com.sss.tally.domain.payment.repository.PaymentRepository;
import com.sss.tally.domain.paymentunit.entity.PaymentUnit;
import com.sss.tally.domain.paymentunit.repository.PaymentUnitRepository;
import com.sss.tally.domain.travel.entity.Travel;
import com.sss.tally.domain.travel.repository.TravelRepository;
import com.sss.tally.domain.travelgroup.repository.TravelGroupRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.BusinessException;
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
	private final AccountRepository accountRepository;
	private final PaymentClient paymentClient;

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

		int total = 0; boolean flag = false;
		for(MemberPaymentDto.MemberPaymentCreateDto participant :paymentManualDto.getPaymentParticipants()){
			total += participant.getAmount();
			if(participant.getMemberUuid().equals(member.getMemberUuid())) flag = true;
		}
		if(total != paymentManualDto.getAmount()) throw new PaymentException(ErrorCode.DIFFERENT_TOTAL_AMOUNT);
		if(!flag) throw new PaymentException(ErrorCode.NOT_EXIST_PAYER_PAYMENT);

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

	public void modifyPaymentAuto(Authentication authentication, PaymentDto.PaymentCardUpdateDto paymentCardUpdateDto){
		Member member = (Member) authentication.getPrincipal();

		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(paymentCardUpdateDto.getTravelId());
		if(travelOptional.isEmpty()) throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);

		Optional<Category> categoryOptional = categoryRepository.findCategoryByCategoryId(
			paymentCardUpdateDto.getCategory());
		if(categoryOptional.isEmpty()) throw new CategoryException(ErrorCode.NOT_EXIST_CATEGORY);

		Optional<Payment> paymentOptional = paymentRepository.findPaymentByPaymentUuid(
			paymentCardUpdateDto.getPaymentUuid());
		if(paymentOptional.isEmpty()) throw new PaymentException(ErrorCode.NOT_EXIST_PAYMENT);

		if(!paymentOptional.get().getMemberId().getMemberId().equals(member.getMemberId()))
			throw new BusinessException(ErrorCode.NOT_EXIST_EDIT_PERMISSION);

		paymentOptional.get().updatePaymentAuto(paymentCardUpdateDto, categoryOptional.get());

		List<MemberPayment> participants = memberPaymentRepository.findMemberPaymentsByPaymentId_PaymentUuid(paymentCardUpdateDto.getPaymentUuid());

		for(MemberPayment participant : participants){
			if(participant.getMemberId().getMemberId().equals(paymentOptional.get().getMemberId().getMemberId())) continue;
			participant.updateStatus(false);
		}
		if(!paymentCardUpdateDto.isVisible()) {
			Optional<MemberPayment> memberPaymentOptional = memberPaymentRepository.findMemberPaymentsByPaymentIdAndMemberId(paymentOptional.get(), member);
			memberPaymentOptional.get().updateMemberPayment(paymentOptional.get().getAmount(), true);
			return;
		}

		int total = 0;
		for(MemberPaymentDto.MemberPaymentCreateDto memberPaymentCreateDto: paymentCardUpdateDto.getPaymentParticipants()){
			total += memberPaymentCreateDto.getAmount();
		}

		if(total != paymentOptional.get().getAmount()) throw new PaymentException(ErrorCode.DIFFERENT_TOTAL_AMOUNT);

		for(MemberPaymentDto.MemberPaymentCreateDto memberPaymentCreateDto: paymentCardUpdateDto.getPaymentParticipants()){
			Optional<Member> memberOptional = memberRepository.findByMemberUuid(memberPaymentCreateDto.getMemberUuid());
			if(memberOptional.isEmpty()) throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

			Optional<MemberPayment> memberPaymentOptional = memberPaymentRepository.findMemberPaymentsByPaymentIdAndMemberId(paymentOptional.get(), memberOptional.get());
			if(memberPaymentOptional.isEmpty()) {
				memberPaymentRepository.save(MemberPayment.of(memberPaymentCreateDto, memberOptional.get(), paymentOptional.get()));
			}else{
				memberPaymentOptional.get().updateMemberPayment(memberPaymentCreateDto.getAmount(), true);
			}
		}
	}
	@Override
	public void modifyMemo(Authentication authentication, PaymentDto.PaymentMemoDto paymentMemoDto) {
		Member member = (Member) authentication.getPrincipal();


		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(paymentMemoDto.getTravelId());
		if(travelOptional.isEmpty()) throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);

		if(!travelGroupRepository.existsByTravelIdAndMemberId(travelOptional.get(), member))
			throw new TravelException(ErrorCode.NOT_EXIST_PARTICIPANT);

		Optional<Payment> paymentOptional = paymentRepository.findPaymentByPaymentUuidAndStatusIsFalse(paymentMemoDto.getPaymentUuid());
		if(paymentOptional.isEmpty()) throw new PaymentException(ErrorCode.NOT_EXIST_PAYMENT);


		if(!memberPaymentRepository.existsByPaymentIdAndMemberIdAndStatusIsTrue(paymentOptional.get(), member))
			throw new PaymentException(ErrorCode.NOT_EXIST_PARTICIPANT);

		paymentOptional.get().updateMemo(paymentMemoDto.getMemo());


	}

	public void modifyPaymentManual(Authentication authentication, PaymentDto.PaymentUpdateDto paymentUpdateDto){
		Member member = (Member) authentication.getPrincipal();

		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(paymentUpdateDto.getTravelId());
		if(travelOptional.isEmpty()) throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);

		Optional<PaymentUnit> paymentUnitOptional = paymentUnitRepository.findPaymentUnitByPaymentUnitId(
			paymentUpdateDto.getPaymentUnitId());
		if(paymentUnitOptional.isEmpty()) throw new PaymentException(ErrorCode.NOT_EXIST_PAYMENT_UNIT);

		Optional<Category> categoryOptional = categoryRepository.findCategoryByCategoryId(
			paymentUpdateDto.getCategory());
		if(categoryOptional.isEmpty()) throw new CategoryException(ErrorCode.NOT_EXIST_CATEGORY);

		Optional<Payment> paymentOptional = paymentRepository.findPaymentByPaymentUuid(
			paymentUpdateDto.getPaymentUuid());
		if(paymentOptional.isEmpty()) throw new PaymentException(ErrorCode.NOT_EXIST_PAYMENT);

		if(!paymentOptional.get().getMemberId().getMemberId().equals(member.getMemberId()))
			throw new BusinessException(ErrorCode.NOT_EXIST_EDIT_PERMISSION);

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(paymentUpdateDto.getPaymentDateTime(), formatter);

		paymentOptional.get().updatePayment(paymentUpdateDto.getAmount(), paymentUpdateDto.getRatio(), paymentUnitOptional.get(), categoryOptional.get(), dateTime,
			paymentUpdateDto.getMemo(), paymentUpdateDto.isVisible(), paymentUpdateDto.getTitle());

		List<MemberPayment> participants = memberPaymentRepository.findMemberPaymentsByPaymentId_PaymentUuid(paymentUpdateDto.getPaymentUuid());

		for(MemberPayment participant : participants){
			if(participant.getMemberId().getMemberId().equals(paymentOptional.get().getMemberId().getMemberId())) continue;
			participant.updateStatus(false);
		}
		if(!paymentUpdateDto.isVisible()) {
			Optional<MemberPayment> memberPaymentOptional = memberPaymentRepository.findMemberPaymentsByPaymentIdAndMemberId(paymentOptional.get(), member);
			memberPaymentOptional.get().updateMemberPayment(paymentUpdateDto.getAmount(), true);
			return;
		}
		int total = 0;
		for(MemberPaymentDto.MemberPaymentCreateDto memberPaymentCreateDto: paymentUpdateDto.getPaymentParticipants()){
			total += memberPaymentCreateDto.getAmount();
		}

		if(total != paymentUpdateDto.getAmount()) throw new PaymentException(ErrorCode.DIFFERENT_TOTAL_AMOUNT);


		for(MemberPaymentDto.MemberPaymentCreateDto memberPaymentCreateDto: paymentUpdateDto.getPaymentParticipants()){
			Optional<Member> memberOptional = memberRepository.findByMemberUuid(memberPaymentCreateDto.getMemberUuid());
			if(memberOptional.isEmpty()) throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

			Optional<MemberPayment> memberPaymentOptional = memberPaymentRepository.findMemberPaymentsByPaymentIdAndMemberId(paymentOptional.get(), memberOptional.get());
			if(memberPaymentOptional.isEmpty()) {
				memberPaymentRepository.save(MemberPayment.of(memberPaymentCreateDto, memberOptional.get(), paymentOptional.get()));
			}else{
				memberPaymentOptional.get().updateMemberPayment(memberPaymentCreateDto.getAmount(), true);
			}
		}
	}

	@Override
	public List<PaymentDto.PaymentListDto> getPaymentList(Authentication authentication, Long travelId) {
		Member member = (Member) authentication.getPrincipal();

		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(travelId);
		if(travelOptional.isEmpty()) throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);

		List<Account> memberAccounts = accountRepository.findAllByMemberIdAndStatusIsFalseOrderByOrderNumberAsc(
			member);

		for(Account account: memberAccounts){
			String contentType = "application/x-www-form-urlencoded;charset=utf-8";
			PaymentDto.PaymentListReqDto from = PaymentDto.PaymentListReqDto.from(account.getAccountNumber(),
				account.getAccountPassword(), travelOptional.get().getStartDate().toString(),
				travelOptional.get().getEndDate().toString());
			PaymentDto.PaymentResDto paymentListRespDtos = paymentClient.requestTransferList(contentType,from);
			for(PaymentDto.PaymentListRespDto paymentListRespDto: paymentListRespDtos.getTranferList()){

				if(paymentListRespDto.getFlag().equals("입금")) continue;

				Optional<Payment> payment = paymentRepository.findPaymentByPaymentUuid(
					paymentListRespDto.getTransferUuid());

				Optional<Category> category = categoryRepository.findCategoryByCategoryId(Long.parseLong(paymentListRespDto.getShopType()+""));
				if(category.isEmpty()) throw new CategoryException(ErrorCode.NOT_EXIST_CATEGORY);

				Optional<PaymentUnit> paymentUnitOptional = paymentUnitRepository.findPaymentUnitByPaymentUnitId(8L);
				if(paymentUnitOptional.isEmpty()) throw new PaymentException(ErrorCode.NOT_EXIST_PAYMENT_UNIT);

				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");
				LocalDateTime dateTime = LocalDateTime.parse(paymentListRespDto.getTransferDate(), formatter);

				if(payment.isEmpty()){
					paymentRepository.save(Payment.of(paymentListRespDto, member, travelOptional.get(), category.get(), paymentUnitOptional.get(), dateTime));
				}
			}

		}

		List<Payment> payments = paymentRepository.findPaymentsByTravelIdAndMemberIdAndStatusIsFalseOrderByPaymentKoreaDate(travelOptional.get(), member);
		return payments.stream()
			.map(PaymentDto.PaymentListDto::from)
			.collect(Collectors.toList());
	}
}