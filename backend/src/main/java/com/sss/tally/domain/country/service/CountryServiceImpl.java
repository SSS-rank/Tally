package com.sss.tally.domain.country.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.country.dto.CountryDto;
import com.sss.tally.api.country.dto.CountryVisaDto;
import com.sss.tally.domain.country.client.CountryClient;
import com.sss.tally.domain.country.entity.Country;
import com.sss.tally.domain.country.repository.CountryRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService{
	private final CountryClient countryClient;
	private final CountryRepository countryRepository;

	@Value("${country.service.key}")
	private String serviceKey;
	@Override
	public List<CountryDto.CountryRespDto> saveAndGetCountryVisa() {
		if(countryRepository.count()==0){
			CountryDto.CountryVisaReqDto countryVisaReqDto = CountryDto.CountryVisaReqDto.of(serviceKey, "JSON", 197, 1);
			CountryDto.CountryVisaRespDto countryVisaRespDto = countryClient.getCountryVisa(countryVisaReqDto);

			for(CountryVisaDto.CountryVisaInfoDto countryVisa:countryVisaRespDto.getData()){
				Country country = Country.of(countryVisa.getCountryCode(), countryVisa.getCountryName(),
					countryVisa.getValidateVisa());
				countryRepository.save(country);
			}
		}

		List<Country> countryList = countryRepository.findAll();
		return countryList.stream()
			.map(CountryDto.CountryRespDto::from)
			.collect(Collectors.toList());
	}
}
