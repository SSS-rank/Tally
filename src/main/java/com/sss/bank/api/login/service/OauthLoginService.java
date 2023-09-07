package com.sss.bank.api.login.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.api.login.dto.OauthLoginDto;
import com.sss.bank.domain.member.entity.Member;
import com.sss.bank.domain.member.repository.MemberRepository;
import com.sss.bank.external.oauth.kakao.service.SocialLoginApiServiceFactory;
import com.sss.bank.external.oauth.model.OAuthAttributes;
import com.sss.bank.external.oauth.service.SocialLoginApiService;
import com.sss.bank.global.jwt.dto.JwtTokenDto;
import com.sss.bank.global.jwt.service.TokenManager;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class OauthLoginService {
	private final MemberRepository memberRepository;
	private final TokenManager tokenManager;
	public OauthLoginDto.Response oauthLogin(String accessToken){
		SocialLoginApiService socialLoginApiService = SocialLoginApiServiceFactory.getSocialLoginApiService();
		OAuthAttributes userInfo = socialLoginApiService.getUserInfo(accessToken);

		JwtTokenDto jwtTokenDto;
		Optional<Member> optionalMember = memberRepository.findByKakaoId(userInfo.getKakaoId());
		if(optionalMember.isEmpty()){ //신규 회원
			Member oauthMember = userInfo.toMemberEntity();
			oauthMember = memberRepository.save(oauthMember);
			// 토큰 생성
			jwtTokenDto = tokenManager.createJwtTokenDto(oauthMember.getMemberId());
			// oauthMember.updateRefreshToken(jwtTokenDto);
		} else { //이미 존재하는 회원
			Member oauthMember = optionalMember.get();
			// 토큰 생성
			jwtTokenDto = tokenManager.createJwtTokenDto(oauthMember.getMemberId());
			// oauthMember.updateRefreshToken(jwtTokenDto);
		}
		return OauthLoginDto.Response.from(jwtTokenDto);
	}
}
