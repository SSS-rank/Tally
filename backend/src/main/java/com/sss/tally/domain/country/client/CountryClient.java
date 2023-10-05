package com.sss.tally.domain.country.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;

import com.sss.tally.api.country.dto.CountryDto;

@FeignClient(url="http://apis.data.go.kr/1262000/EntranceVisaService2", name = "countryClient")
public interface CountryClient {
	@GetMapping(value="/getEntranceVisaList2", consumes = "application/json")
	CountryDto.CountryVisaRespDto getCountryVisa(@SpringQueryMap CountryDto.CountryVisaReqDto countryVisaReqDto);
}
