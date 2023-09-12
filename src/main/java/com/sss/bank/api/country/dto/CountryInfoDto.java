package com.sss.bank.api.country.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.bank.domain.country.entity.Country;

import lombok.Builder;
import lombok.Getter;

public class CountryInfoDto {

	@Getter
	@Builder
	public static class CountryInfoReqDto {
		@JsonProperty("ISO alpha3")
		private String countryCode;

		@JsonProperty("한글명")
		private String countryName;
	}

	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class CountryInfoRespDto {
		private String countryCode;
		private String countryName;

		public static CountryInfoRespDto from(Country country) {
			return CountryInfoRespDto.builder()
				.countryCode(country.getCountryCode())
				.countryName(country.getCountryName())
				.build();
		}
	}

}
