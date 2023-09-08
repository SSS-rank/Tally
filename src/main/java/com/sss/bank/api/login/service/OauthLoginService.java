package com.sss.bank.api.login.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.api.login.dto.OauthLoginDto;
import com.sss.bank.domain.member.entity.Member;
import com.sss.bank.domain.member.repository.MemberRepository;
import com.sss.bank.external.oauth.model.OAuthAttributes;
import com.sss.bank.external.oauth.kakao.service.KakaoLoginApiService;
import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.AuthenticationException;
import com.sss.bank.global.error.exception.MemberException;
import com.sss.bank.global.jwt.dto.JwtTokenDto;
import com.sss.bank.global.jwt.service.TokenManager;
import com.sss.bank.global.redis.service.RedisService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class OauthLoginService {
	private final KakaoLoginApiService kakaoLoginApiService;
	private final RedisService redisService;
	private final MemberRepository memberRepository;
	private final TokenManager tokenManager;
	public OauthLoginDto.Response oauthLogin(String accessToken){
		OAuthAttributes userInfo = kakaoLoginApiService.getMemberInfo(accessToken);

		JwtTokenDto jwtTokenDto;
		Optional<Member> optionalMember = memberRepository.findMemberByKakaoId(userInfo.getKakaoId());
		if(optionalMember.isEmpty()){ //신규 회원
			Member oauthMember = Member.from(userInfo);
			oauthMember = memberRepository.save(oauthMember);
			// 토큰 생성
			jwtTokenDto = tokenManager.createJwtTokenDto(oauthMember.getMemberId());
			redisService.setValues(String.valueOf(oauthMember.getMemberId()), jwtTokenDto.getRefreshToken());
		} else { //이미 존재하는 회원
			Member oauthMember = optionalMember.get();
			if(oauthMember.getWithdrawalDate().isBefore(LocalDateTime.now()))
				throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
			// 토큰 생성
			jwtTokenDto = tokenManager.createJwtTokenDto(oauthMember.getMemberId());
			redisService.setValues(String.valueOf(oauthMember.getMemberId()), jwtTokenDto.getRefreshToken());
		}
		return OauthLoginDto.Response.from(jwtTokenDto);
	}
}
