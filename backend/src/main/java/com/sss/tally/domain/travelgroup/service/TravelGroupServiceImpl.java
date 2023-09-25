package com.sss.tally.domain.travelgroup.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.member.dto.MemberDto;
import com.sss.tally.domain.customchecklist.service.CustomCheckListService;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;
import com.sss.tally.domain.travel.repository.TravelRepository;
import com.sss.tally.domain.travelgroup.entity.TravelGroup;
import com.sss.tally.domain.travelgroup.repository.TravelGroupRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.TravelException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TravelGroupServiceImpl implements TravelGroupService {
	private final TravelRepository travelRepository;
	private final TravelGroupRepository travelGroupRepository;
	private final CustomCheckListService customCheckListService;

	@Override
	public void addTravelGroup(Authentication authentication, Long travelId) {
		Member member = (Member)authentication.getPrincipal();

		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(travelId);
		if (travelOptional.isEmpty())
			throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);

		travelGroupRepository.save(TravelGroup.of(member, travelOptional.get()));
		customCheckListService.createInitCustomCheckList(member, travelOptional.get());

	}

	@Override
	public List<MemberDto.MemberTravelDto> getTravelGroup(Authentication authentication, Long travelId) {
		Member member = (Member) authentication.getPrincipal();

		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(travelId);
		if(travelOptional.isEmpty()) throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);

		if(!travelGroupRepository.existsByTravelIdAndMemberIdAndVisibleIsTrue(travelOptional.get(), member))
			throw new TravelException(ErrorCode.NOT_EXIST_PARTICIPANT);

		List<Member> memberIds = travelGroupRepository.findMembersByTravelId(travelId);
		return memberIds.stream()
			.map(MemberDto.MemberTravelDto::from)
			.collect(Collectors.toList());
	}
}
