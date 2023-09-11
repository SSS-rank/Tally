package com.sss.bank.global.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.AuthenticationException;
import com.sss.bank.global.jwt.constant.TokenType;
import com.sss.bank.global.jwt.service.TokenManager;
import com.sss.bank.global.util.AuthorizationHeaderUtills;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthenticationIntercepter implements HandlerInterceptor {

	private final TokenManager tokenManager;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
		Exception {
		// 0. preflignt면 무시
		if (HttpMethod.OPTIONS.name().equals(request.getMethod())) {
			return true;
		}

		String swaggerUri = request.getRequestURI();
		if (swaggerUri.contains("swagger") || swaggerUri.contains("api-docs") || swaggerUri.contains("webjars"))
			return true;

		// 1. Authorization Header 검증
		String authorizationHeader = request.getHeader("Authorization");
		AuthorizationHeaderUtills.validateAuthorization(authorizationHeader);

		// 2. 토큰 검증
		String token = authorizationHeader.split(" ")[1];
		tokenManager.validateToken(token);

		// 3. 토큰 타입
		Claims tokenClaims = tokenManager.getTokenClaims(token);
		String tokenType = tokenClaims.getSubject();
		if (!TokenType.isAccessToken(tokenType)) {
			throw new AuthenticationException(ErrorCode.NOT_ACCESS_TOKEN);
		}
		return true;
	}
}
