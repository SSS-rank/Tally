package com.sss.bank.api.login.kakaotoken.dto;

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
	public static class Response{
		private String token_type;
		private String access_token;
		private Integer expires_in;
		private String refresh_token;
		private Integer getRefresh_token_expires_in;
		private String scope;
	}
}
