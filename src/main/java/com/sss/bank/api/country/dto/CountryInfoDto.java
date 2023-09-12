package com.sss.bank.api.country.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CountryInfoDto {
	@JsonProperty("ISO alpha3")
	private String countryCode;

	@JsonProperty("한글명")
	private String countryName;
}
