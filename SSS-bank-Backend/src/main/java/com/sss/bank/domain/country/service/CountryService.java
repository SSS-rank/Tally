package com.sss.bank.domain.country.service;

import java.util.List;

import com.sss.bank.api.country.dto.CountryInfoDto;

public interface CountryService {
	List<CountryInfoDto.CountryInfoRespDto> getAllCountryInfo();
}
