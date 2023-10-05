package com.sss.bank.api.token.service;

import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.api.token.dto.AccessTokenRespDto;
import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.AuthenticationException;
import com.sss.bank.global.jwt.constant.GrantType;
import com.sss.bank.global.jwt.service.TokenManager;
import com.sss.bank.global.redis.service.RedisService;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TokenService {
	private final RedisService redisService;
	private final TokenManager tokenManager;

	public AccessTokenRespDto createAccessTokenByRefreshToken(String refreshToken){
		try {
			// refreshToken 으로 멤버 정보 받아오기
			Claims tokenClaims = tokenManager.getTokenClaims(refreshToken);
			Long memberId = Long.valueOf((Integer)tokenClaims.get("memberId"));

			// redis 에서 memberId로 refresh token 가져오기
			String findRefreshToken = redisService.getValues(String.valueOf(memberId));

			// refresh token이 같을 경우
			if (!(findRefreshToken.isEmpty()) && findRefreshToken.equals(refreshToken)) {
				Date accessTokenExpireTime = tokenManager.createAcessTokenExpireTime();
				String accessToken = tokenManager.createAcessToken(memberId, accessTokenExpireTime);
				return AccessTokenRespDto.of(GrantType.BEARER.getType(),accessToken,accessTokenExpireTime);
			} else {
				throw new AuthenticationException(ErrorCode.REFRESH_TOKEN_NOT_FOUND);
			}
		} catch (Exception e){
			throw new AuthenticationException(ErrorCode.REFRESH_TOKEN_EXPIRED);
		}
	}
}
