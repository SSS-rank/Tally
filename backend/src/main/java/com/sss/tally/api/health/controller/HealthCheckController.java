package com.sss.tally.api.health.controller;

import java.util.Arrays;

import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.health.dto.HealthCheckResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HealthCheckController {
	private final Environment environment;

	@GetMapping("/health")
	public ResponseEntity<HealthCheckResponseDto> healthCheck() {
		HealthCheckResponseDto healthCheckResponseDto = HealthCheckResponseDto.builder()
			.health("ok")
			.activeProfiles(Arrays.asList(environment.getActiveProfiles()))
			.build();
		return ResponseEntity.status(HttpStatus.OK).body(healthCheckResponseDto);
	}
}
