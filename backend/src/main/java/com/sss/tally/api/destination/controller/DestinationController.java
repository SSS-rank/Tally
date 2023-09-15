package com.sss.tally.api.destination.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.destination.dto.DestinationDto;
import com.sss.tally.api.destination.service.DestinationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/destination")
public class DestinationController {
	private final DestinationService destinationService;
	@GetMapping("/city")
	public ResponseEntity<DestinationDto.CityDto> getCityList(@RequestParam int state){
		destinationService.getCityList(state);
		return null;
	}
}
