package com.sss.bank.api.health.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class HealthCheckResponseDto {
	private String health;
	private List<String> activeProfiles;

	public static HealthCheckResponseDto of(String health, List<String> activeProfiles) {
		return HealthCheckResponseDto.builder()
			.health(health)
			.activeProfiles(activeProfiles)
			.build();
	}
}
