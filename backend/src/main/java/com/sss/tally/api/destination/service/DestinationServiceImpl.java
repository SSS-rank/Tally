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
	public void createState(List<DestinationDto.StateCityRespDto> stateList) {
		for(DestinationDto.StateCityRespDto state: stateList)
			stateRepository.save(State.from(state));
	}

	@Override
	public void createCity(List<DestinationDto.StateCityRespDto> cityList) {
		String state = "";
		int cityCount = 0;
		for(DestinationDto.StateCityRespDto city: cityList){
			String[] c = city.getName().split(" ");
			Optional<State> stateByStateName = stateRepository.findStateByStateName(c[0]);
			if(stateByStateName.isEmpty()) throw new BusinessException(ErrorCode.NOT_EXIST_STATE);
			
			// 최상단의 3개의 지역만 저장하도록 수정
			if(state.equals(c[0])) cityCount++;
			else {cityCount = 0; state=c[0];}

			if(cityCount < 3)
				cityRepository.save(City.of(c[1], stateByStateName.get()));
		}
	}

	@Override
	public List<DestinationDto.StateDto> getStateList(){
		List<State> all = stateRepository.findAllByOrderByStateIdAsc();
		return all.stream()
			.map(DestinationDto.StateDto::from)
			.collect(Collectors.toList());
	}

	@Override
	public List<DestinationDto.CityDto> getCityList(Long code) {
		List<City> all = cityRepository.findBystateId_StateId(code);
		return all.stream()
			.map(DestinationDto.CityDto::from)
			.collect(Collectors.toList());
	}
}
