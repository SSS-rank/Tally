package com.sss.bank.external.oauth.kakao.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.sss.bank.external.oauth.kakao.client.KakaoMemberInfoClient;
import com.sss.bank.external.oauth.kakao.dto.KakaoMemberInfoRespDto;
import com.sss.bank.external.oauth.model.OAuthAttributes;
import com.sss.bank.global.jwt.constant.GrantType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class KakaoLoginApiServiceImpl implements KakaoLoginApiService {
	private final KakaoMemberInfoClient kakaoMemberInfoClient;
	private final String CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";

	@Override
	public OAuthAttributes getMemberInfo(String accessToken) {
		KakaoMemberInfoRespDto kakaoMemberInfoRespDto = kakaoMemberInfoClient.getKakaoMemberInfo(CONTENT_TYPE, GrantType.BEARER.getType()+" "+accessToken);
		KakaoMemberInfoRespDto.KakaoAccount kakaoAccount = kakaoMemberInfoRespDto.getKakaoAccount();
		String email = kakaoAccount.getEmail();

		return OAuthAttributes.builder()
			.kakaoId(kakaoMemberInfoRespDto.getId())
			.name(kakaoAccount.getProfile().getNickname())
			.email(!StringUtils.hasText(email) ? null : email)
			.build();
	}
}
