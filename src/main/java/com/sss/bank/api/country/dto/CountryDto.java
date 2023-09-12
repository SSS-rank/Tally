package com.sss.bank.api.country.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CountryDto {
	@Builder
	@Getter
	public static class CountryReq {
		private String serviceKey;
		private int page;
		private int perPage;

		public static CountryReq of(String serviceKey, int page, int perPage) {
			return CountryReq.builder()
				.serviceKey(serviceKey)
				.page(page)
				.perPage(perPage)
				.build();
		}
	}

	@Builder
	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class CountryResp {
		private List<CountryInfoDto.CountryInfoReqDto> data;
	}
}
