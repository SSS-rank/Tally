package com.sss.bank.api.country.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;

import com.sss.bank.api.country.dto.CountryDto;

@FeignClient(url="https://api.odcloud.kr/api/15091117/v1", name="countryClient")
public interface CountryClient {
	@GetMapping(value = "/uddi:f340c326-d04c-43ab-bd1a-a3caf2c273e3", consumes = "application/json")
	CountryDto.CountryResp requestCountryInfo(@SpringQueryMap CountryDto.CountryReq countryReq);
}
