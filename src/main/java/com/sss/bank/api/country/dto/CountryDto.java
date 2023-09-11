package com.sss.bank.api.country.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.bank.api.kakaotoken.dto.KakaoTokenDto;
import com.sss.bank.domain.country.entity.Country;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class CountryDto {

	@Builder
	@Getter
	@ToString
	@NoArgsConstructor
	@AllArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class Response{
		private String countryCode;
		private String countryName;

		public static Response from(Country country){
			return Response.builder()
				.countryCode(country.getCountryCode())
				.countryName(country.getCountryName())
				.build();
		}
	}
}
