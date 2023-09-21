package com.sss.tally.api.country.dto;

import java.util.List;

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
		private String countryName;
		private String countryCode;
		private String visa;

		public static CountryRespDto from(Country country){
			return CountryRespDto.builder()
				.countryName(country.getCountryName())
				.countryCode(country.getCountryCode())
				.visa(country.getVisa())
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
