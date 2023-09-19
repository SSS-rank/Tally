package com.sss.tally.api.destination.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.destination.dto.DestinationDto;
import com.sss.tally.domain.city.entity.City;
import com.sss.tally.domain.city.repository.CityRepository;
import com.sss.tally.domain.state.entity.State;
import com.sss.tally.domain.state.repository.StateRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.BusinessException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DestinationServiceImpl implements DestinationService{
	private final CityRepository cityRepository;
	private final StateRepository stateRepository;

	@Override
	public void createStatus(List<DestinationDto.StateCityRespDto> stateList) {
		for(DestinationDto.StateCityRespDto state: stateList)
			stateRepository.save(State.from(state));
	}

}
