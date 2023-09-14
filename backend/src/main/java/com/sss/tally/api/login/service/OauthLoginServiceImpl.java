package com.sss.tally.api.login.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.login.dto.OauthLoginDto;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.external.kakao.service.KakaoLoginApiService;
import com.sss.tally.external.model.OAuthAttributes;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.MemberException;
import com.sss.tally.global.jwt.dto.JwtTokenDto;
import com.sss.tally.global.jwt.service.JwtProvider;
import com.sss.tally.global.redis.service.RedisService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class OauthLoginServiceImpl implements OauthLoginService {
	private final KakaoLoginApiService kakaoLoginApiService;
	private final MemberRepository memberRepository;
	private final RedisService redisService;
	private final JwtProvider jwtProvider;

	@Override
	public OauthLoginDto.OauthLoginRespDto oauthLogin(String accessToken) {
		OAuthAttributes userInfo = kakaoLoginApiService.getMemberInfo(accessToken);

		System.out.println(userInfo.getNickname()+" "+userInfo.getProfileImageUrl());

		JwtTokenDto jwtTokenDto;
		Optional<Member> optionalMember = memberRepository.findMemberByKakaoId(userInfo.getKakaoId());
		String memberUuid = UUID.randomUUID().toString();

		if(optionalMember.isEmpty()){ //신규 회원
			Member oauthMember = Member.of(memberUuid, userInfo);
			oauthMember = memberRepository.save(oauthMember);
			// 토큰 생성
			jwtTokenDto = jwtProvider.createJwtTokenDto(oauthMember.getMemberId());
			redisService.setValues(String.valueOf(oauthMember.getMemberId()), jwtTokenDto.getRefreshToken());
		} else { //이미 존재하는 회원
			Member oauthMember = optionalMember.get();
			if(oauthMember.getWithdrawalDate()!=null && oauthMember.getWithdrawalDate().isBefore(LocalDateTime.now()))
				throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
			// 토큰 생성
			jwtTokenDto = jwtProvider.createJwtTokenDto(oauthMember.getMemberId());
			redisService.setValues(String.valueOf(oauthMember.getMemberId()), jwtTokenDto.getRefreshToken());
		}
		return OauthLoginDto.OauthLoginRespDto.from(jwtTokenDto);
	}
}
