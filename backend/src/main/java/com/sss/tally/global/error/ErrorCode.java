package com.sss.tally.global.error;

import org.springframework.http.HttpStatus;

import com.google.api.Http;

import lombok.Getter;

@Getter
public enum ErrorCode {
	//알림
	FAIL_SEND_NOTIFICATION(HttpStatus.BAD_REQUEST, "001", "알림 전송이 실패했습니다."),
	NOT_VALID_DEVICETOKEN(HttpStatus.BAD_REQUEST, "002", "유효하지 않은 디바이스토큰 입니다."),

	// 인증, 인가
	NOT_EXIST_AUTHORIZATION(HttpStatus.UNAUTHORIZED, "001", "Authorization Header가 빈 값입니다."),
	NOT_VALID_BEARER_GRANT_TYPE(HttpStatus.UNAUTHORIZED, "002", "인증 타입이 Bearer 타입이 아닙니다."),
	EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "003", "만료된 토큰입니다."),
	NOT_VALID_TOKEN(HttpStatus.UNAUTHORIZED, "004", "유효하지 않은 토큰입니다."),
	REFRESH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "005", "만료된 refresh token 입니다."),
	REFRESH_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "006", "토큰을 찾을 수 없습니다."),


	//회원
	ALREADY_WITHDRAWAL_MEMBER(HttpStatus.UNAUTHORIZED, "011", "탈퇴한 회원입니다."),
	NOT_EXIST_MEMBER(HttpStatus.UNAUTHORIZED, "012", "존재하지 않는 회원입니다."),

	//정산
	NOT_EXIST_PAYMENT_MEMBER(HttpStatus.BAD_REQUEST, "001", "결제에 태그된 멤버가 없습니다."),
	NOT_EXIST_PAYER(HttpStatus.BAD_REQUEST, "002", "결제자가 없습니다."),
	NOT_IDENTICAL_MEMBER(HttpStatus.BAD_REQUEST, "003", "동일한 결제자가 아닙니다."),
	NOT_BEFORE_STATUS(HttpStatus.BAD_REQUEST, "004", "정산 전 상태가 아닙니다."),

	//결제
	NOT_EXIST_PAYMENT(HttpStatus.BAD_REQUEST, "001", "결제정보가 존재하지 않습니다."),

	// 여행
	NOT_EXIST_TRAVEL_TYPE(HttpStatus.BAD_REQUEST, "011", "잘못된 여행 타입입니다."),
	NOT_EXIST_TRAVEL(HttpStatus.BAD_REQUEST, "012", "존재하지 않는 여행입니다."),
	NOT_EXIST_CITY(HttpStatus.BAD_REQUEST, "013", "존재하지 않는 지역입니다."),
	NOT_EXIST_STATE(HttpStatus.BAD_REQUEST, "014", "존재하지 않는 시도입니다."),
	;

	ErrorCode(HttpStatus httpStatus, String errorCode, String message) {
		this.httpStatus = httpStatus;
		this.errorCode = errorCode;
		this.message = message;
	}

	private HttpStatus httpStatus;
	private String errorCode;
	private String message;
}
