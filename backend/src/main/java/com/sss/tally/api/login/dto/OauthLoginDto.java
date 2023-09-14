package com.sss.tally.api.login.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sss.tally.global.jwt.dto.JwtTokenDto;
import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

public class OauthLoginDto {

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static class OauthLoginReqDto{
		@NonNull
		private String kakaoAccessToken;
		@NotNull
		private String deviceToken;
	}

	@Getter
	@Setter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class OauthLoginRespDto {
		private String grantType;
		private String accessToken;
		private String refreshToken;
		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
		private Date accessTokenExpireTime;
		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
		private Date refreshTokenExpireTime;

		public static OauthLoginRespDto from(JwtTokenDto jwtTokenDto) {
			return OauthLoginRespDto.builder()
				.grantType(jwtTokenDto.getGrantType())
				.accessToken(jwtTokenDto.getAccessToken())
				.refreshToken(jwtTokenDto.getRefreshToken())
				.accessTokenExpireTime(jwtTokenDto.getAccessTokenExpireTime())
				.refreshTokenExpireTime(jwtTokenDto.getRefreshTokenExpireTime())
				.build();
		}
	}
}
