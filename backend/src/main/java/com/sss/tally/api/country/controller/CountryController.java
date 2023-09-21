package com.sss.tally.api.country.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.country.dto.CountryDto;
import com.sss.tally.domain.country.service.CountryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/country")
public class CountryController {
	private final CountryService countryService;
	@GetMapping
	public ResponseEntity<List<CountryDto.CountryRespDto>> saveAndGetCountryVisa(){
		List<CountryDto.CountryRespDto> countryRespDto = countryService.saveAndGetCountryVisa();
		return ResponseEntity.status(HttpStatus.OK).body(countryRespDto);
	}
}
