package com.sss.bank.external.oauth.kakao.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.sss.bank.external.oauth.kakao.dto.KakaoUserInfoResDto;

@FeignClient(url = "https://kapi.kakao.com", name="kakaoUserInfoClient")
public interface KakaoUserInfoClient {
	@GetMapping(value = "/v2/user/me", consumes = "application/json")
	KakaoUserInfoResDto getKakaoUserInfo(@RequestHeader("Content-type") String contentType,
		@RequestHeader("Authorization") String accessToken);
}
