package com.sss.tally.api.defaultchecklist.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class DefaultCheckListDto {
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@Getter
	public static class AddDefaultCheckListReqDto {
		private String content;
	}
}
