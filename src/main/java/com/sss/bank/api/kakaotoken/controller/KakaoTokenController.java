package com.sss.bank.api.kakaotoken.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.kakaotoken.client.KakaoTokenClient;
import com.sss.bank.api.kakaotoken.dto.KakaoTokenDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"02. kakaoToken"}, description = "카카오 관련 서비스")
@RestController
@RequiredArgsConstructor
public class KakaoTokenController {
	private final KakaoTokenClient kakaoTokenClient;

	@Value("${kakao.client.id}")
	private String clientId;

	@Value("${kakao.client.secret}")
	private String clientSecret;

	@ApiOperation(value = "카카오 콜백", notes = "code를 받아 accessToken을 발급한다.")
	@GetMapping("/oauth/kakao/callback")
	public ResponseEntity<KakaoTokenDto.Response> loginCallback(String code) {
		String contentType = "application/x-www-form-urlencoded;charset=utf-8";
		KakaoTokenDto.Request kakaoTokenRequest = KakaoTokenDto.Request.of(clientId, code, clientSecret);
		KakaoTokenDto.Response kakaoTokenResponse = kakaoTokenClient.requestKakaoToken(contentType, kakaoTokenRequest);

		return ResponseEntity.status(HttpStatus.OK).body(kakaoTokenResponse);
	}
}