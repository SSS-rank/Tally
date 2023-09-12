package com.sss.bank.api.country.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.country.dto.CountryInfoDto;
import com.sss.bank.domain.country.service.CountryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/country")
public class CountryController {
	private final CountryService countryService;

	@GetMapping
	public ResponseEntity<List<CountryInfoDto.CountryInfoRespDto>> getCountry() {
		List<CountryInfoDto.CountryInfoRespDto> countryInfoRespDtoList = countryService.getAllCountryInfo();
		return ResponseEntity.status(HttpStatus.OK).body(countryInfoRespDtoList);
	}
}
