package com.sss.tally.domain.travelgroup.service;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	@Override
	public void addTravelGroup(Authentication authentication, Long travelId) {
		Member member = (Member) authentication.getPrincipal();

		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(travelId);
		if(travelOptional.isEmpty()) throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);

		travelGroupRepository.save(TravelGroup.of(member, travelOptional.get()));
	}
}
