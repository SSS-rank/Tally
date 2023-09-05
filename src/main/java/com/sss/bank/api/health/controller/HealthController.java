package com.sss.bank.api.health.controller;

import java.util.Arrays;

import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.health.dto.HealthCheckResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HealthController {
	private final Environment environment;

	@GetMapping("/health")
	public ResponseEntity<HealthCheckResponseDto> healthCheck() {
		HealthCheckResponseDto healthCheckResponseDto = HealthCheckResponseDto.of("ok",
			Arrays.asList(environment.getActiveProfiles()));
		return ResponseEntity.ok(healthCheckResponseDto);
	}
}
