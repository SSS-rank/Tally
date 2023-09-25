package com.sss.tally.api.customchecklist.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.customchecklist.entity.CustomChecklist;

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

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@Getter
	public static class GetCustomCheckListRespDto {

		private Long customCheckListId;

		private String content;

		public static CustomCheckListDto.GetCustomCheckListRespDto from(CustomChecklist customChecklist) {
			return CustomCheckListDto.GetCustomCheckListRespDto.builder()
				.customCheckListId(customChecklist.getCustomChecklistId())
				.content(customChecklist.getContent())
				.build();
		}
	}
}
