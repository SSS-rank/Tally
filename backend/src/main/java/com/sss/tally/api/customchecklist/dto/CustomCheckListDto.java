package com.sss.tally.api.customchecklist.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CustomCheckListDto {
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@Getter
	public static class AddCustomCheckListReqDto {
		private String content;

		public Long travelId;
	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@Getter
	public static class UpdateCustomCheckListReqDto {

		private Long customCheckListId;

		private String content;
	}
}
