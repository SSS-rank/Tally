package com.sss.tally.domain.travel.service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

import com.sss.tally.api.travel.dto.TravelDto;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;

public interface TravelService {
	TravelDto.TravelCreateRespDto createTravel(Authentication authentication, TravelDto.TravelCreateDto travelCreateDto);
	List<TravelDto> getTravelList(Authentication authentication, String type, Pageable pageable);
	List<TravelDto.TravelNotStartDto> getNotStartTravel(Authentication authentication);

	TravelDto.TravelDetailDto getTravelDetail(Authentication authentication, Long travelId);
	Long totalTravelMoney(Member user, List<Member> members, Travel travel);

	List<TravelDto> getInvisibleTravelList(Authentication authentication);

	TravelDto.TravelVisitRespDto getTravelVisitCount(Authentication authentication);

	TravelDto.TravelVisitListRespDto getTravelVisitList(Authentication authentication);
}
