package com.sss.tally.domain.country.service;

import java.util.List;

import com.sss.tally.api.country.dto.CountryDto;

public interface CountryService {
	List<CountryDto.CountryRespDto> saveAndGetCountryVisa();
}
