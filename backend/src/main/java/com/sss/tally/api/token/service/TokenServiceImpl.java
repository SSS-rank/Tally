package com.sss.tally.api.token.service;

import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.token.dto.TokenDto;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.AuthenticationException;
import com.sss.tally.global.jwt.service.JwtProvider;
import com.sss.tally.global.redis.service.RedisService;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService{
	private final RedisService redisService;
	private final JwtProvider jwtProvider;
	@Override
	public TokenDto.TokenRespDto createAccessToken(String refreshToken) {
		try {
			// refreshToken 으로 멤버 정보 받아오기
			Claims tokenClaims = jwtProvider.getTokenClaims(refreshToken);
			String memberUuid = (String)tokenClaims.get("memberUuid");
			// redis 에서 memberUuId로 refresh token 가져오기
			String findRefreshToken = redisService.getValues(memberUuid);
			// refresh token이 같을 경우
			if (!(findRefreshToken.isEmpty()) && findRefreshToken.equals(refreshToken)) {
				Date accessTokenExpireTime = jwtProvider.createAccessTokenExpireTime();
				String accessToken = jwtProvider.createAccessToken(memberUuid, accessTokenExpireTime);
				return TokenDto.TokenRespDto.of(accessToken,accessTokenExpireTime);
			} else {
				throw new AuthenticationException(ErrorCode.REFRESH_TOKEN_NOT_FOUND);
			}
		} catch (Exception e){
			throw new AuthenticationException(ErrorCode.REFRESH_TOKEN_EXPIRED);
		}
	}
}
