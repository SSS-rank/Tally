package com.sss.bank.api.country.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JsonParseException;
import org.springframework.boot.json.JsonParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.country.client.CountryClient;
import com.sss.bank.api.country.dto.CountryDto;
import com.sss.bank.api.country.dto.CountryInfoDto;
import com.sss.bank.api.kakaotoken.dto.KakaoTokenDto;
import com.sss.bank.domain.country.entity.Country;
import com.sss.bank.domain.country.repository.CountryRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/country")
public class CountryController {
	private final CountryClient countryClient;
	private final CountryRepository countryRepository;

	@Value("${country.service.key}")
	private String serviceKey;

	@GetMapping
	public ResponseEntity<List<Country>> getCountry() {
		if(countryRepository.count()==0) {
			CountryDto.CountryReq countryReq = CountryDto.CountryReq.of(serviceKey,1,196);
			CountryDto.CountryResp countryResp = countryClient.requestCountryInfo(countryReq);

			for (CountryInfoDto countryInfo : countryResp.getData()) {
				Country country = Country.of(countryInfo.getCountryCode(), countryInfo.getCountryName());
				countryRepository.save(country);
			}
		}

		return ResponseEntity.status(HttpStatus.OK).body(countryRepository.findAll());
	}
}
