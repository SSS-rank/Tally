package com.sss.tally.api.member.dto;


import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.member.entity.Member;

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
	@NoArgsConstructor
	@AllArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class MemberReqDto{
		@NotNull
		private String nickname;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class MemberPasswordDto{
		@NotNull
		private String transferPassword;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value=PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class MemberTravelDto{
		private String image;
		private String memberNickname;
		private String memberUuid;

		public static MemberTravelDto from(Member member){
			return MemberTravelDto.builder()
				.memberNickname(member.getNickname())
				.memberUuid(member.getMemberUuid())
				.image(member.getProfileImage())
				.build();
		}
	}
}
