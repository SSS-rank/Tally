package com.sss.tally.global.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorCode {
	//알림
	FAIL_SEND_NOTIFICATION(HttpStatus.BAD_REQUEST, "001", "알림 전송이 실패했습니다."),
	NOT_VALID_DEVICETOKEN(HttpStatus.BAD_REQUEST, "001", "유효하지 않은 디바이스토큰입니다.");

	ErrorCode(HttpStatus httpStatus, String errorCode, String message) {
		this.httpStatus = httpStatus;
		this.errorCode = errorCode;
		this.message = message;
	}

	private HttpStatus httpStatus;
	private String errorCode;
	private String message;
}
