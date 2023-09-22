package com.sss.tally.api.travel.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	@GetMapping
	public ResponseEntity<List<TravelDto>> getTravelList(Authentication authentication, @RequestParam("type")String type, Pageable pageable){
		return ResponseEntity.status(HttpStatus.OK).body(travelService.getTravelList(authentication, type, pageable));
	}

	@GetMapping("/info")
	public ResponseEntity<List<TravelDto.TravelNotStartDto>> getNotStartTravel(Authentication authentication){
		List<TravelDto.TravelNotStartDto> notStartTravel = travelService.getNotStartTravel(authentication);
		return ResponseEntity.status(HttpStatus.OK).body(notStartTravel);
	}
}
