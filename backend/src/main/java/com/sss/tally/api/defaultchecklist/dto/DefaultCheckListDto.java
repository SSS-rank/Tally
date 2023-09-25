package com.sss.tally.api.defaultchecklist.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.defaultchecklist.entity.DefaultCheckList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class DefaultCheckListDto {
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@Getter
	public static class AddDefaultCheckListReqDto {
		private String content;
	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@Getter
	public static class UpdateDefaultCheckListReqDto {

		private Long defaultCheckListId;

		private String content;
	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@Getter
	public static class GetDefaultCheckListRespDto {

		private Long defaultCheckListId;

		private String content;

		public static GetDefaultCheckListRespDto from(DefaultCheckList defaultCheckList) {
			return GetDefaultCheckListRespDto.builder()
				.defaultCheckListId(defaultCheckList.getDefaultChecklistId())
				.content(defaultCheckList.getContent())
				.build();
		}
	}
}
