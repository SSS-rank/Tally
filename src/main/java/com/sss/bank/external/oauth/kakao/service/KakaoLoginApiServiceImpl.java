package com.sss.bank.external.oauth.kakao.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.sss.bank.external.oauth.kakao.client.KakaoUserInfoClient;
import com.sss.bank.external.oauth.kakao.dto.KakaoUserInfoResDto;
import com.sss.bank.external.oauth.model.OAuthAttributes;
import com.sss.bank.global.jwt.constant.GrantType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class KakaoLoginApiServiceImpl implements KakaoLoginApiService {
	private final KakaoUserInfoClient kakaoUserInfoClient;
	private final String CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";

	@Override
	public OAuthAttributes getUserInfo(String accessToken) {
		KakaoUserInfoResDto kakaoUserInfoResDto = kakaoUserInfoClient.getKakaoUserInfo(CONTENT_TYPE, GrantType.BEARER.getType()+" "+accessToken);
		KakaoUserInfoResDto.KakaoAccount kakaoAccount = kakaoUserInfoResDto.getKakaoAccount();
		String email = kakaoAccount.getEmail();

		return OAuthAttributes.builder()
			.kakaoId(kakaoUserInfoResDto.getId())
			.name(kakaoAccount.getProfile().getNickname())
			.email(!StringUtils.hasText(email) ? null : email)
			.build();
	}
}
