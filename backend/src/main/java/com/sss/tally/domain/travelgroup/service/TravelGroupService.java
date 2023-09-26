package com.sss.tally.domain.travelgroup.service;

import java.util.List;

import org.springframework.security.core.Authentication;

import com.sss.tally.api.member.dto.MemberDto;
import com.sss.tally.api.travel.dto.TravelDto;

public interface TravelGroupService {
	void addTravelGroup(Authentication authentication, Long travelId);
	List<MemberDto.MemberTravelDto> getTravelGroup(Authentication authentication, Long travelId);

	void modifyTravelVisible(Authentication authentication, TravelDto.TravelVisibleReqDto travelVisibleReqDto);
}
