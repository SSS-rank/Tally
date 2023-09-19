package com.sss.tally.api.destination.dto;

import java.util.List;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.city.entity.City;
import com.sss.tally.domain.state.entity.State;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class DestinationDto {

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static class CityReqDto{
		private String code;
		private String name;
	}

	@Builder
	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class StateCityRespListDto{
		private List<StateCityRespDto> regcodes;
	}

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class StateCityRespDto{
		private String code;
		private String name;
	}

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class StateDto{
		private Long stateId;
		private String stateName;

		public static StateDto from(State state){
			return StateDto.builder()
				.stateId(state.getStateId())
				.stateName(state.getStateName())
				.build();
		}
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class CityDto{
		private Long cityId;
		private String cityName;

		public static CityDto from(City city){
			return CityDto.builder()
				.cityId(city.getCityId())
				.cityName(city.getCityName())
				.build();
		}
	}
}
