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
import org.springframework.boot.json.JsonParseException;
import org.springframework.boot.json.JsonParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.country.dto.CountryDto;
import com.sss.bank.domain.country.entity.Country;
import com.sss.bank.domain.country.repository.CountryRepository;

import lombok.RequiredArgsConstructor;
@RestController
@RequiredArgsConstructor
@RequestMapping("/country")
public class CountryController {
	private final CountryRepository countryRepository;
	@GetMapping
	public ResponseEntity<List<CountryDto.Response>> getCountryInfo() throws Exception {
		String result = "";
		List<CountryDto.Response> countryResponse = new ArrayList<>();
		URL url = new URL("https://api.odcloud.kr/api/15091117/v1/uddi:f340c326-d04c-43ab-bd1a-a3caf2c273e3?page=1&perPage=196&serviceKey=lQexMZMXDyFSmMCHE%2BbQj%2Fcm7uDGA%2Fn0AuNXPx0rfTPz%2BDOj%2FRX8U1Ay50ntvW2CJgOgOpMvoBYNohwsp%2BQMsw%3D%3D");
		HttpURLConnection urlConnection = (HttpURLConnection)url.openConnection();
		urlConnection.setRequestMethod("GET");
		urlConnection.setRequestProperty("Content-type", "application/json");

		BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream(), StandardCharsets.UTF_8));
		result = br.readLine();

		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObject = (JSONObject)jsonParser.parse(result);
		JSONArray jsonArray = (JSONArray) jsonObject.get("data");
		for(int i=0;i<jsonArray.size();i++){
			JSONObject object = (JSONObject) jsonArray.get(i);
			String countryCode = (String)object.get("ISO alpha3");
			String countryName = (String)object.get("한글명");
			Country country = Country.of(countryCode, countryName);
			countryRepository.save(country);
			countryResponse.add(CountryDto.Response.from(country));
		}

		return ResponseEntity.status(HttpStatus.OK).body(countryResponse);
	}
}
