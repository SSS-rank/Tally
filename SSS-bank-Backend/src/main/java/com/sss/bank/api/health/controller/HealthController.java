package com.sss.bank.api.health.controller;

import java.util.Arrays;

import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.health.dto.HealthCheckResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"10. health"}, description = "상태 관련 서비스")
@RestController
@RequiredArgsConstructor
public class HealthController {
	private final Environment environment;

	@ApiOperation(value = "상태 체크", notes = "상태를 체크한다.")
	@GetMapping("/health")
	public ResponseEntity<HealthCheckResponseDto> healthCheck() {
		HealthCheckResponseDto healthCheckResponseDto = HealthCheckResponseDto.of("ok",
			Arrays.asList(environment.getActiveProfiles()));
		return ResponseEntity.ok(healthCheckResponseDto);
	}
}
