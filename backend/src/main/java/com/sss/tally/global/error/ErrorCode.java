package com.sss.tally.global.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorCode {
	// 인증, 인가
	NOT_EXIST_AUTHORIZATION(HttpStatus.UNAUTHORIZED, "001", "Authorization Header가 빈 값입니다."),
	NOT_VALID_BEARER_GRANT_TYPE(HttpStatus.UNAUTHORIZED, "002", "인증 타입이 Bearer 타입이 아닙니다."),
	EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "003", "만료된 토큰입니다."),
	NOT_VALID_TOKEN(HttpStatus.UNAUTHORIZED, "004", "유효하지 않은 토큰입니다."),

	//회원
	ALREADY_WITHDRAWAL_MEMBER(HttpStatus.UNAUTHORIZED, "011","탈퇴한 회원입니다.")
	;
	ErrorCode(HttpStatus httpStatus, String errorCode, String message){
		this.httpStatus = httpStatus;
		this.errorCode = errorCode;
		this.message = message;
	}
	private HttpStatus httpStatus;
	private String errorCode;
	private String message;
}
