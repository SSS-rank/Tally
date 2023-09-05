package com.sss.bank.global.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorCode {
	// TEST(HttpStatus.INTERNAL_SERVER_ERROR, "001", "businessExceptionTest");

	TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "001", "토큰이 만료되었습니다."),
	NOT_VALID_TOKEN(HttpStatus.UNAUTHORIZED, "002", "해당 토큰은 유효하지 않습니다.");


	ErrorCode(HttpStatus httpStatus, String errorCode, String message) {
		this.httpStatus = httpStatus;
		this.errorCode = errorCode;
		this.message = message;
	}

	private HttpStatus httpStatus;
	private String errorCode;
	private String message;
}
