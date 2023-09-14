package com.sss.tally.external.kakao.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.external.kakao.client.KakaoMemberInfoClient;
import com.sss.tally.external.kakao.dto.KakaoMemberInfoRespDto;
import com.sss.tally.external.model.OAuthAttributes;
import com.sss.tally.global.jwt.constant.GrantType;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class KakaoLoginApiServiceImpl implements KakaoLoginApiService{
	private final KakaoMemberInfoClient kakaoMemberInfoClient;

	@Override
	public OAuthAttributes getMemberInfo(String accessToken) {
		String CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
		KakaoMemberInfoRespDto kakaoMemberInfoRespDto = kakaoMemberInfoClient.getKakaoMemberInfo(
			CONTENT_TYPE, GrantType.BEARER.getType()+" "+accessToken);
		KakaoMemberInfoRespDto.KakaoAccount kakaoAccount = kakaoMemberInfoRespDto.getKakaoAccount();

		return OAuthAttributes.builder()
			.kakaoId(kakaoMemberInfoRespDto.getId())
			.nickname(kakaoAccount.getProfile().getNickname())
			.profileImageUrl(kakaoAccount.getProfile().getProfileImageUrl())
			.build();
	}
}
