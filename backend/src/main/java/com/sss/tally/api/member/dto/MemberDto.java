package com.sss.tally.api.member.dto;


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
}
