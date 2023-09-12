package com.sss.bank.domain.country.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.api.country.client.CountryClient;
import com.sss.bank.api.country.dto.CountryDto;
import com.sss.bank.api.country.dto.CountryInfoDto;
import com.sss.bank.domain.country.entity.Country;
import com.sss.bank.domain.country.repository.CountryRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {
	private final CountryRepository countryRepository;
	private final CountryClient countryClient;

	@Value("${country.service.key}")
	private String serviceKey;

	@Override
	public List<CountryInfoDto.CountryInfoRespDto> getAllCountryInfo() {
		if (countryRepository.count() == 0) {
			CountryDto.CountryReq countryReq = CountryDto.CountryReq.of(serviceKey, 1, 196);
			CountryDto.CountryResp countryResp = countryClient.requestCountryInfo(countryReq);

			for (CountryInfoDto.CountryInfoReqDto countryInfo : countryResp.getData()) {
				Country country = Country.of(countryInfo.getCountryCode(), countryInfo.getCountryName());
				countryRepository.save(country);
			}
		}

		List<Country> countries = countryRepository.findAll();
		return countries.stream()
			.map(CountryInfoDto.CountryInfoRespDto::from)
			.collect(Collectors.toList());
	}
}
