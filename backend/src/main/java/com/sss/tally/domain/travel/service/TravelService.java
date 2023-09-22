package com.sss.tally.domain.travel.service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

import com.sss.tally.api.travel.dto.TravelDto;

public interface TravelService {
	TravelDto.TravelCreateRespDto createTravel(Authentication authentication, TravelDto.TravelCreateDto travelCreateDto);
	List<TravelDto> getTravelList(Authentication authentication, String type, Pageable pageable);
	List<TravelDto.TravelNotStartDto> getNotStartTravel(Authentication authentication);

	TravelDto.TravelDetailDto getTravelDetail(Authentication authentication, Long travelId);
}
