package com.sss.tally.api.analysis.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.analysis.dto.AnalysisDto;
import com.sss.tally.domain.category.entity.Category;
import com.sss.tally.domain.category.repository.CategoryRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.domain.memberpayment.entity.MemberPayment;
import com.sss.tally.domain.memberpayment.repository.MemberPaymentRepository;
import com.sss.tally.domain.payment.entity.Payment;
import com.sss.tally.domain.payment.repository.PaymentRepository;
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
@Transactional
@RequiredArgsConstructor
public class AnalysisServiceImpl implements AnalysisService{
	private final TravelGroupRepository travelGroupRepository;
	private final PaymentRepository paymentRepository;
	private final TravelRepository travelRepository;
	private final MemberPaymentRepository memberPaymentRepository;
	private final MemberRepository memberRepository;
	private final CategoryRepository categoryRepository;

	@Override
	public AnalysisDto.GroupMemberRespDto getGroupAnalysis(Authentication authentication, Long travelId) {
		Member auth = (Member)authentication.getPrincipal();
		Travel travel = travelRepository.findTravelByTravelId(travelId)
			.orElseThrow(()->new TravelException(ErrorCode.NOT_EXIST_TRAVEL));

		// 해당 여행에 참여하는 멤버 리스트
		List<Member> travelGroupMembersId = travelGroupRepository.findMembersByTravelId(travelId);
		// 해당 여행에서 사용한 총 지출 리스트 (삭제 안된 것 + 나만보기 설정 안된 것)
		List<Payment> payments = paymentRepository.findAllByTravelIdAndStatusIsFalseAndVisibleIsTrue(travel);

		Long totalAmount = 0L; // 해당 여행에서 쓴 총 금액
		for(Payment payment:payments)
			totalAmount += payment.getAmount();

		List<AnalysisDto.GroupMemberRespInfo> groupMemberAnalysis = new ArrayList<>();
		for(Member member:travelGroupMembersId){ // 멤버마다
			Long amount = 0L;
			for(Payment payment:payments){ // 태그된 비용이면 그만큼 더해주기
				Optional<MemberPayment> tag= memberPaymentRepository.findMemberPaymentByPaymentIdAndMemberIdAndStatusIsFalse(payment, member);
				if(tag.isEmpty()) continue;
				amount+=tag.get().getAmount();
			}
			double percent = ((double) amount / totalAmount) * 100.0; // 비율 구하기
			if(Objects.equals(auth.getMemberUuid(), member.getMemberUuid()))
				groupMemberAnalysis.add(AnalysisDto.GroupMemberRespInfo.of(member.getNickname(), amount, percent, true, member.getMemberUuid()));
			else
				groupMemberAnalysis.add(AnalysisDto.GroupMemberRespInfo.of(member.getNickname(), amount, percent, false, member.getMemberUuid()));
		}

		return AnalysisDto.GroupMemberRespDto.of(groupMemberAnalysis, totalAmount);
	}
	@Override
	public AnalysisDto.MemberRespDto getMemberAnalysis(Authentication authentication, Long travelId, String memberUuid) {
		Member auth = (Member)authentication.getPrincipal();
		Travel travel = travelRepository.findTravelByTravelId(travelId)
			.orElseThrow(()->new TravelException(ErrorCode.NOT_EXIST_TRAVEL));
		Member searchMember = memberRepository.findByMemberUuid(memberUuid)
			.orElseThrow(()->new MemberException(ErrorCode.NOT_EXIST_MEMBER));

		List<Payment> payments;
		if(Objects.equals(auth.getMemberUuid(), memberUuid)) // 만약 조회한 분석 그래프가 로그인 한 본인일 경우
			payments = paymentRepository.findAllByTravelIdAndStatusIsFalse(travel); // 나만 보기한 항목도 포함
		else // 디른 사람의 분석 그래프를 조회했을 경우
			payments = paymentRepository.findAllByTravelIdAndStatusIsFalseAndVisibleIsTrue(travel);

		List<AnalysisDto.MemberRespInfo> memberRespInfoList = new ArrayList<>();
		HashMap<Long, Long> categoryMoney = new HashMap<>();
		Long totalAmount = 0L;
		for(long i = 1L; i<=7; i++) categoryMoney.put(i, 0L);
		for (Payment payment:payments){
			List<MemberPayment> memberPaymentList = memberPaymentRepository.findMemberPaymentsByPaymentIdAndStatusIsFalse(payment);
			for(MemberPayment memberPayment: memberPaymentList){
				if(memberPayment.getMemberId().getMemberUuid().equals(searchMember.getMemberUuid())){
					totalAmount+=memberPayment.getAmount();
					Long categoryId = payment.getCategoryId().getCategoryId();
					Long amount = memberPayment.getAmount();
					categoryMoney.put(categoryId, categoryMoney.get(categoryId)+amount);
				}
			}
		}

		for(long i=1L; i<=7; i++){
			double percent = ((double) categoryMoney.get(i) / totalAmount) * 100.0; // 비율 구하기
			Category category = categoryRepository.findCategoryByCategoryId(i)
				.orElseThrow(()->new CategoryException(ErrorCode.NOT_EXIST_CATEGORY));
			memberRespInfoList.add(AnalysisDto.MemberRespInfo.of(
				i, category.getCategoryType(), percent, categoryMoney.get(i)
			));
		}
		return AnalysisDto.MemberRespDto.of(memberRespInfoList, totalAmount);
	}

	@Override
	public List<AnalysisDto.CategoryRespDto> getCategoryDetail(Authentication authentication, Long travelId,
		String memberUuid, Long categoryId) {
		Member auth = (Member)authentication.getPrincipal();
		Member searchMember = memberRepository.findByMemberUuid(memberUuid)
			.orElseThrow(()->new MemberException(ErrorCode.NOT_EXIST_MEMBER));
		Travel travel = travelRepository.findTravelByTravelId(travelId)
			.orElseThrow(()->new TravelException(ErrorCode.NOT_EXIST_TRAVEL));
		Category category = categoryRepository.findCategoryByCategoryId(categoryId)
			.orElseThrow(()->new CategoryException(ErrorCode.NOT_EXIST_CATEGORY));

		List<Payment> payments;
		// 본인 정보를 조회할 셩우
		if(auth.getMemberUuid().equals(searchMember.getMemberUuid()))
			payments = paymentRepository.findAllByTravelIdAndCategoryIdAndStatusIsFalse(travel, category);
		else
			payments = paymentRepository.findAllByTravelIdAndCategoryIdAndStatusIsFalseAndVisibleIsTrue(travel, category);

		List<AnalysisDto.CategoryRespDto> categoryRespDtoList = new ArrayList<>();
		for(Payment payment : payments){
			Optional<MemberPayment> memberPayment = memberPaymentRepository.findMemberPaymentByPaymentIdAndMemberIdAndStatusIsFalse(payment, searchMember);
			if(memberPayment.isPresent()){
				List<MemberPayment> members = memberPaymentRepository.findMemberPaymentsByPaymentIdAndStatusIsFalse(payment);
				List<String> tagMembers = new ArrayList<>();
				for(MemberPayment member:members)
					tagMembers.add(member.getMemberId().getNickname());

				categoryRespDtoList.add(AnalysisDto.CategoryRespDto.of(
					payment.getPaymentKoreaDate(), payment.getPaymentUuid(), payment.getPaymentName(), tagMembers,payment.getAmount(), memberPayment.get()
						.getAmount()
				));
			}
		}
		return categoryRespDtoList;
	}

	@Override
	public void changeCategory(AnalysisDto.ChangeCategoryReqDto changeCategoryReqDto) {
		Payment payment = paymentRepository.findPaymentByPaymentUuid(changeCategoryReqDto.getPaymentUuid())
			.orElseThrow(()->new PaymentException(ErrorCode.NOT_EXIST_PAYMENT));
		Category category = categoryRepository.findCategoryByCategoryId(changeCategoryReqDto.getCategoryId())
			.orElseThrow(()->new CategoryException(ErrorCode.NOT_EXIST_CATEGORY));

		payment.changeCategory(category);
	}
}
