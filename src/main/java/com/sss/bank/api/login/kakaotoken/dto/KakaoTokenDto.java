package com.sss.bank.api.login.kakaotoken.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class KakaoTokenDto {

	@Builder
	@Getter
	public static class Request{
		private String grant_type;
		private String client_id;
		private String redirect_uri;
		private String code;
		private String client_secret;
	}

	@Builder
	@Getter
	@ToString
	@NoArgsConstructor
	@AllArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class Response{
		private String tokenType;
		private String accessToken;
		private Integer expiresIn;
		private String refreshToken;
		private Integer getRefreshTokenExpiresIn;
		private String scope;
	}
}
