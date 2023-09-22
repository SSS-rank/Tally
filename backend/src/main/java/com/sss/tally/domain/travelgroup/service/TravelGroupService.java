package com.sss.tally.domain.travelgroup.service;

import org.springframework.security.core.Authentication;

public interface TravelGroupService {
	void addTravelGroup(Authentication authentication, Long travelId);
}
