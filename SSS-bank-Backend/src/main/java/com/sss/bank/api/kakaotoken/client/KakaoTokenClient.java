package com.sss.bank.api.kakaotoken.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.sss.bank.api.kakaotoken.dto.KakaoTokenDto;

@FeignClient(url = "https://kauth.kakao.com", name = "kakaoTokenClient")
public interface KakaoTokenClient {
	@PostMapping(value = "/oauth/token", consumes = "application/json")
	KakaoTokenDto.Response requestKakaoToken(@RequestHeader("Content-type") String contentType,
		@SpringQueryMap KakaoTokenDto.Request request);
}