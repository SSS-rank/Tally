package com.sss.tally.api.destination.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.destination.client.StateCityClient;
import com.sss.tally.api.destination.dto.DestinationDto;
import com.sss.tally.api.destination.service.DestinationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/destination")
public class DestinationController {
	private final DestinationService destinationService;
	private final StateCityClient stateCityClient;

	@PostMapping("/state")
	public ResponseEntity<String> createStatusList(){
		String contentType = "application/json";
		String statusCode = "*00000000";
		DestinationDto.StateCityRespListDto stateCityRespListDto = stateCityClient.requestStatusInfo(contentType, true, statusCode);
		destinationService.createState(stateCityRespListDto.getRegcodes());
		return ResponseEntity.status(HttpStatus.OK).body("OK");
	}

	@PostMapping("/city")
	public ResponseEntity<String> createCityList(){
		String contentType = "application/json";
		String[] codes = new String[]{"41*000000",
			"43*000000",
			"44*000000",
			"45*000000",
			"46*000000",
			"47*000000",
			"48*000000",
			"51*000000"};
		for(String code : codes) {
			DestinationDto.StateCityRespListDto stateCityRespListDto = stateCityClient.requestStatusInfo(contentType,
				true, code);
			destinationService.createCity(stateCityRespListDto.getRegcodes());
		}
		return ResponseEntity.status(HttpStatus.OK).body("OK");
	}
 }
