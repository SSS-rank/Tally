package com.sss.tally.api.travelgroup.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.travelgroup.dto.TravelGroupDto;
import com.sss.tally.domain.travelgroup.service.TravelGroupService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/group")
public class TravelGroupController {
	private final TravelGroupService travelGroupService;
	@PostMapping
	public ResponseEntity<String> addTravelGroup(Authentication authentication, @RequestBody @Valid TravelGroupDto.CreateGroupDto createGroupDto){
		travelGroupService.addTravelGroup(authentication, createGroupDto.getTravelId());
		return ResponseEntity.status(HttpStatus.OK).body("invite success");
	}
}
