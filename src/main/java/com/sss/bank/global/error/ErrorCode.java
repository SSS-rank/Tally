package com.sss.bank.global.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorCode {
	// TEST(HttpStatus.INTERNAL_SERVER_ERROR, "001", "businessExceptionTest");

	INVALID_ACCESS_TOKEN(HttpStatus.BAD_REQUEST, "-1", "accessToken 정보가 잘못되었습니다."),
	DUPLICATE_ACCOUNT(HttpStatus.BAD_REQUEST, "-2", "입 출금 계좌가 중복됩니다."),
	INVALID_WITHDRAW_ACCOUNT(HttpStatus.BAD_REQUEST, "-3", "출금 계좌번호가 잘못되었습니다."),
	INVALID_DEPOSIT_ACCOUNT(HttpStatus.BAD_REQUEST, "-4", "입금 계좌번호가 잘못되었습니다."),
	UNAUTHORIZED_ACCESS(HttpStatus.BAD_REQUEST, "-5", "출금계좌 소유자와 accessToken이 일치하지 않습니다."),
	INSUFFICIENT_FUNDS(HttpStatus.BAD_REQUEST, "-6", "잔액이 부족합니다");

	ErrorCode(HttpStatus httpStatus, String errorCode, String message) {
		this.httpStatus = httpStatus;
		this.errorCode = errorCode;
		this.message = message;
	}

	private HttpStatus httpStatus;
	private String errorCode;
	private String message;

}
