package com.sss.tally.external.kakao.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.sss.tally.external.kakao.dto.KakaoMemberInfoRespDto;

@FeignClient(url = "https://kapi.kakao.com", name="kakaoMemberInfoClient")
public interface KakaoMemberInfoClient {
	@GetMapping(value = "/v2/user/me", consumes = "application/json")
	KakaoMemberInfoRespDto getKakaoMemberInfo(@RequestHeader("Content-type") String contentType,
		@RequestHeader("Authorization") String accessToken);
}
