package com.sss.bank.api.login.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sss.bank.global.jwt.dto.JwtTokenDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class OauthLoginDto {
	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class Response {
		private String grantType;
		private String accessToken;
		private String refreshToken;

		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
		private Date accessTokenExpireTime;

		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
		private Date refreshTokenExpireTime;
	}
}
