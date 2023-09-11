package com.sss.tally.api.health.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class HealthCheckResponseDto {
	private String health;
	private List<String> activeProfiles;
}
