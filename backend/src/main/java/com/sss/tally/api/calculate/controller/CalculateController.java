package com.sss.tally.api.calculate.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.calculate.dto.CalculateDto;
import com.sss.tally.domain.caculategroup.service.CalculateGroupService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/calculate")
public class CalculateController {

	private final CalculateGroupService calculateGroupService;

	@PostMapping
	public ResponseEntity<String> createCalculate(
		@RequestBody List<CalculateDto.CalculateCreateDto> calculateCreateDto) {
		String result = calculateGroupService.createCalculate(calculateCreateDto);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
}
