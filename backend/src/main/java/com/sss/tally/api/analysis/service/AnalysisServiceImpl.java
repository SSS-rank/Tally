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
}
