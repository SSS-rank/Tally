package com.sss.bank.global.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorCode {
	// TEST(HttpStatus.INTERNAL_SERVER_ERROR, "001", "businessExceptionTest");

	TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "001", "토큰이 만료되었습니다."),
	NOT_VALID_TOKEN(HttpStatus.UNAUTHORIZED, "002", "해당 토큰은 유효하지 않습니다."),
	NOT_EXIST_AUTHORIZATION(HttpStatus.UNAUTHORIZED, "003", "Authorization Header가 빈 값입니다."),
	NOT_VALID_BEARER_GRANT_TYPE(HttpStatus.UNAUTHORIZED, "004", "인증 타입이 Bearer 타입이 아닙니다."),

	ALREADY_REGISTER_MEMBER(HttpStatus.BAD_REQUEST, "005", "이미 가입된 회원입니다."),

	REFRESH_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "006", "해당 RefreshToken을 찾을 수 없습니다."),
	REFRESH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED,"007","해당 RefreshToken은 만료되었습니다.");


	ErrorCode(HttpStatus httpStatus, String errorCode, String message) {
		this.httpStatus = httpStatus;
		this.errorCode = errorCode;
		this.message = message;
	}

	private HttpStatus httpStatus;
	private String errorCode;
	private String message;
}
