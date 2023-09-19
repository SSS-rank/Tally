package com.sss.tally.api.travel.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.travel.dto.TravelDto;
import com.sss.tally.domain.travel.service.TravelService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel")
public class TravelController {
	private final TravelService travelService;
	@PostMapping
	public ResponseEntity<String> createTravel(Authentication authentication, @RequestBody TravelDto.TravelCreateDto travelCreateDto){
		travelService.createTravel(authentication, travelCreateDto);
		return ResponseEntity.status(HttpStatus.CREATED).body("OK");
	}
}