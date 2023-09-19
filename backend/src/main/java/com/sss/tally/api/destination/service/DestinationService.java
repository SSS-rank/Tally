package com.sss.tally.api.destination.service;

import java.util.List;

import com.sss.tally.api.destination.dto.DestinationDto;

public interface DestinationService {
	void createState(List<DestinationDto.StateCityRespDto> statusList);
	void createCity(List<DestinationDto.StateCityRespDto> cityList);
	List<DestinationDto.StateDto> getStateList();
	List<DestinationDto.CityDto> getCityList(Long code);
}
