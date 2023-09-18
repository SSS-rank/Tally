package com.sss.tally.api.destination.dto;

import java.util.List;

import org.springframework.data.repository.cdi.Eager;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.city.entity.City;

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
	public static class StatusRespListDto{
		private List<StatusCityRespDto> regcodes;
	}

	@Builder
	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class StatusCityReqDto{
		private String regcode_pattern;
		private final boolean is_ignore_zero = true;

		public static StatusCityReqDto from(String regcodePattern){
			return StatusCityReqDto.builder()
				.regcode_pattern(regcodePattern)
				.build();
		}
	}

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class StatusCityRespDto{
		private String code;
		private String name;
	}
}
