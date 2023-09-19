package com.sss.tally.api.member.dto;


import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MemberDto {

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static class MemberRespDto{
		private String nickname;
		private String profileImage;
		public static MemberRespDto of(String nickname, String profileImage){
			return MemberRespDto.builder()
				.nickname(nickname)
				.profileImage(profileImage)
				.build();
		}
	}

	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class MemberReqDto{
		@NotNull
		private String nickname;
		@NotNull
		private String profileImage;
	}
}
