package com.sss.bank.api.login.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.login.kakaotoken.client.KakaoTokenClient;
import com.sss.bank.api.login.kakaotoken.dto.KakaoTokenDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class KakaoTokenController {
	private final KakaoTokenClient kakaoTokenClient;

	@Value("${kakao.client.id}")
	private String clientId;

	@Value("${kakao.client.secret}")
	private String clientSecret;
	@GetMapping("/oauth/kakao/callback")
	public @ResponseBody String loginCallback(String code){
		String contentType = "application/x-www-form-urlencoded;charset=utf-8";
		KakaoTokenDto.Request kakaoTokenRequest = KakaoTokenDto.Request.builder()
			.client_id(clientId)
			.client_secret(clientSecret)
			.grant_type("authorization_code")
			.code(code)
			.redirect_uri("http://localhost:8080/oauth/kakao/callback")
			.build();
		KakaoTokenDto.Response kakaoTokenResponse = kakaoTokenClient.requestKakaoToken(contentType, kakaoTokenRequest);

		return "kakao token: "+kakaoTokenResponse;
	}
}