package com.sss.bank.api.logout.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.AuthenticationException;
import com.sss.bank.global.jwt.constant.TokenType;
import com.sss.bank.global.jwt.service.TokenManager;
import com.sss.bank.global.redis.service.RedisService;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class LogoutService {
	private final RedisService redisService;
	private final TokenManager tokenManager;

	public void logout(String accessToken){
		tokenManager.validateToken(accessToken);

		Claims tokenClaims = tokenManager.getTokenClaims(accessToken);
		String tokenType = tokenClaims.getSubject();
		if(!TokenType.isAccessToken(tokenType)){
			throw new AuthenticationException(ErrorCode.NOT_ACCESS_TOKEN);
		}

		String memberId = String.valueOf(tokenClaims.get("memberId"));
		redisService.expireValues(memberId);
	}
}
