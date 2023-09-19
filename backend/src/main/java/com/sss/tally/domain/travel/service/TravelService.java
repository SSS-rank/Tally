package com.sss.tally.domain.travel.service;

import org.springframework.security.core.Authentication;

import com.sss.tally.api.travel.dto.TravelDto;

public interface TravelService {
	void createTravel(Authentication authentication, TravelDto.TravelCreateDto travelCreateDto);
}
