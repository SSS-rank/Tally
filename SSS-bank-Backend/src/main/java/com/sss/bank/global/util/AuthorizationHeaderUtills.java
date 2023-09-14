package com.sss.bank.global.util;

import org.springframework.util.StringUtils;

import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.AuthenticationException;
import com.sss.bank.global.jwt.constant.GrantType;

public class AuthorizationHeaderUtills {
	public static void validateAuthorization(String authorizationHeader){
		// authorizationHeader 필수 체크
		if(!StringUtils.hasText(authorizationHeader)){
			throw new AuthenticationException(ErrorCode.NOT_EXIST_AUTHORIZATION);
		}

		// authorizationHeader Bearer 체크
		String[] authorizations = authorizationHeader.split(" ");
		if(authorizations.length < 2 || (!GrantType.BEARER.getType().equals(authorizations[0]))){
			throw new AuthenticationException(ErrorCode.NOT_VALID_BEARER_GRANT_TYPE);
		}
	}
}
