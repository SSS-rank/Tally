package com.sss.tally.api.country.dto;

import java.util.List;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.country.entity.Country;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CountryDto {

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static class CountryRespDto{
		private Long countryId;
		private String countryName;
		private String countryCode;

		public static CountryRespDto from(Country country){
			return CountryRespDto.builder()
				.countryId(country.getCountryId())
				.countryName(country.getCountryName())
				.countryCode(country.getCountryCode())
				.build();
		}
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class CountryVisaAndTimeDto{
		private Long countryId;
		private String visa;
		private float timeDifference;

		public static CountryVisaAndTimeDto from(Country country){
			return CountryVisaAndTimeDto.builder()
				.countryId(country.getCountryId())
				.visa(country.getVisa())
				.timeDifference(country.getTimeDifference())
				.build();
		}
	}


	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class CountryVisaReqDto{
		private String serviceKey;
		private String returnType;
		private int numOfRows;
		private int pageNo;

		public static CountryVisaReqDto of(String serviceKey, String returnType, int numOfRows, int pageNo){
			return CountryVisaReqDto.builder()
				.serviceKey(serviceKey)
				.returnType(returnType)
				.numOfRows(numOfRows)
				.pageNo(pageNo)
				.build();
		}
	}

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class CountryVisaRespDto {
		private List<CountryVisaDto.CountryVisaInfoDto> data;
	}
}
