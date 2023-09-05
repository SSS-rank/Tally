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
		private final String grant_type = "authorization_code";
		private String client_id;
		private final String redirect_uri = "http://localhost:8080/oauth/kakao/callback";
		private String code;
		private String client_secret;

		public static Request of(String clientId, String code, String clientSecret) {
			return Request.builder()
				.client_id(clientId)
				.client_secret(clientSecret)
				.code(code)
				.build();
		}
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
