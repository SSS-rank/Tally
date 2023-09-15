package com.sss.tally.api.destination.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.city.entity.City;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DestinationDto {
	@Getter
	@Builder
	@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class CityDto{
		private String cityName;
		public static CityDto from(City city){
			return CityDto.builder()
				.cityName(city.getCityName())
				.build();
		}
	}
}
