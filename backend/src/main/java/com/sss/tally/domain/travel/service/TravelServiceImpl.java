package com.sss.tally.domain.travel.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.travel.dto.TravelDto;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.domain.travel.entity.Travel;
import com.sss.tally.domain.travel.entity.TravelTypeEnum;
import com.sss.tally.domain.travel.repository.TravelRepository;
import com.sss.tally.domain.travelgroup.entity.TravelGroup;
import com.sss.tally.domain.travelgroup.repository.TravelGroupRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.MemberException;
import com.sss.tally.global.error.exception.TravelException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TravelServiceImpl implements TravelService{
	private final TravelRepository travelRepository;
	private final MemberRepository memberRepository;
	private final TravelGroupRepository travelGroupRepository;

	@Override
	public void createTravel(Authentication authentication, TravelDto.TravelCreateDto travelCreateDto) {
		Member member = (Member)authentication.getPrincipal();
		Optional<Member> memberOptional = memberRepository.findByMemberUuid(member.getMemberUuid());

		if(memberOptional.isEmpty()) throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

		TravelTypeEnum travelTypeEnum = null;
		if(travelCreateDto.getTravelType().equals("state")){
			travelTypeEnum = TravelTypeEnum.STATE;
		}else if(travelCreateDto.getTravelType().equals("city")){
			travelTypeEnum = TravelTypeEnum.CITY;
		}else if(travelCreateDto.getTravelType().equals("global")){
			travelTypeEnum = TravelTypeEnum.GLOBAL;
		}else{
			throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL_TYPE);
		}

		String[] start = travelCreateDto.getStartDate().split("-");
		LocalDate startLocalDate = LocalDate.of(Integer.parseInt(start[0]), Integer.parseInt(start[1]), Integer.parseInt(start[2]));
		String[] end = travelCreateDto.getEndDate().split("-");
		LocalDate endLocalDate = LocalDate.of(Integer.parseInt(end[0]), Integer.parseInt(end[1]), Integer.parseInt(end[2]));

		Travel travel = Travel.of(travelCreateDto, travelTypeEnum, startLocalDate, endLocalDate, false);
		Travel save = travelRepository.save(travel);
		travelGroupRepository.save(TravelGroup.of(memberOptional.get(), save));
	}
}
