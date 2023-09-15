package com.sss.tally.api.destination.service;

import com.sss.tally.api.destination.dto.DestinationDto;

public interface DestinationService {
	DestinationDto.CityDto getCityList(int state);
}
