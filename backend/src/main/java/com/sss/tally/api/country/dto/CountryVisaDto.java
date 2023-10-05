package com.sss.tally.api.country.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

public class CountryVisaDto {

	@Getter
	@Builder
	public static class CountryVisaInfoDto{
		@JsonProperty("country_iso_alp2")
		private String countryCode;
		@JsonProperty("country_nm")
		private String countryName;
		@JsonProperty("gnrl_pspt_visa_cn")
		private String validateVisa;
	}
}
