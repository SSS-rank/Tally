package com.sss.bank.global.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorCode {
	// 인증 & 인가
	TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "001", "토큰이 만료되었습니다."),
	NOT_VALID_TOKEN(HttpStatus.UNAUTHORIZED, "002", "해당 토큰은 유효하지 않습니다."),
	NOT_EXIST_AUTHORIZATION(HttpStatus.UNAUTHORIZED, "003", "Authorization Header가 빈 값입니다."),
	NOT_VALID_BEARER_GRANT_TYPE(HttpStatus.UNAUTHORIZED, "004", "인증 타입이 Bearer 타입이 아닙니다."),
	REFRESH_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "006", "해당 RefreshToken을 찾을 수 없습니다."),
	REFRESH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "007", "해당 RefreshToken은 만료되었습니다."),
	NOT_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, "008", "해당 토큰은 ACCESS 토큰이 아닙니다."),

	// 회원
	ALREADY_REGISTER_MEMBER(HttpStatus.BAD_REQUEST, "009", "이미 가입된 회원입니다."),
	ALREADY_WITHDRAWAL_MEMBER(HttpStatus.UNAUTHORIZED, "010", "탈퇴한 회원입니다."),
	NOT_EXIST_MEMBER(HttpStatus.BAD_REQUEST, "011", "해당 회원은 존재하지 않습니다."),

	//은행
	NOT_EXIST_BANK(HttpStatus.BAD_REQUEST, "012", "해당 은행은 존재하지 않습니다."),
	BANK_CODE_MISMATCH(HttpStatus.BAD_REQUEST, "013", "은행 코드가 일치하지 않습니다."),

	// 계좌
	DUPLICATE_ACCOUNT(HttpStatus.BAD_REQUEST, "014", "입 출금 계좌가 중복됩니다."),
	INVALID_WITHDRAW_ACCOUNT(HttpStatus.BAD_REQUEST, "015", "출금 계좌번호가 잘못되었습니다."),
	INVALID_DEPOSIT_ACCOUNT(HttpStatus.BAD_REQUEST, "016", "입금 계좌번호가 잘못되었습니다."),
	UNAUTHORIZED_ACCESS(HttpStatus.BAD_REQUEST, "017", "출금계좌 소유자와 accessToken이 일치하지 않습니다."),
	INSUFFICIENT_FUNDS(HttpStatus.BAD_REQUEST, "018", "잔액이 부족합니다"),
	NOT_EXIST_ACCOUNT(HttpStatus.BAD_REQUEST, "019", "해당 계좌는 존재하지 않습니다."),
	INVALID_ACCOUNT_PASSWORD(HttpStatus.BAD_REQUEST, "020", "잘못된 계좌 비밀번호입니다."),
	INVALID_ACCOUNT_NUMBER(HttpStatus.BAD_REQUEST, "021", "잘못된 계좌 번호입니다."),
	INVALID_ONE_VALUE(HttpStatus.BAD_REQUEST, "022", "잘못된 1원 이체 예금주 명입니다."),
	EXPIRE_ONE_VALUE(HttpStatus.BAD_REQUEST, "023", "1원이체 입력 제한시간 초과입니다."),

	// 가게
	NOT_EXIST_SHOP(HttpStatus.BAD_REQUEST, "023", "해당 가게는 존재하지 않습니다."),

	// 나라
	NOT_EXIST_COUNTRY(HttpStatus.BAD_REQUEST, "024", "해당 나라는 존재하지 않습니다."),

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
