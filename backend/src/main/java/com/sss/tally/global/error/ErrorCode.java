package com.sss.tally.global.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorCode {
	// 권한
	NOT_EXIST_EDIT_PERMISSION(HttpStatus.BAD_REQUEST, "001", "편집 및 삭제 권한은 결제자에게만 있습니다."),
	NOT_EXIST_VIEW_PERMISSION(HttpStatus.BAD_REQUEST, "002", "열람할 권한이 없습니다."),
	NOT_EXIST_DELETE_PERMISSION(HttpStatus.BAD_REQUEST, "003", "결제 완료 건은 삭제할 수 없습니다."),

	//알림,
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
	NOT_EQUAL_LOGIN_MEMBER_PAYER(HttpStatus.BAD_REQUEST, "005", "로그인 사용자와 결제자가 일치하지 않습니다."),
	NOT_EXIST_GROUP_PAYMENT(HttpStatus.BAD_REQUEST, "006", "정산에 포함된 결제 정보들이 없습니다"),
	NOT_VALID_CALCULATE_UUID(HttpStatus.BAD_REQUEST, "007", "유효하지 않은 정산 uuid 입니다."),
	NOT_EXIST_CALCULATE_MEMBER(HttpStatus.BAD_REQUEST, "008", "해당 정산 그룹에 해당 유저가 존재하지 않습니다."),
	CANT_EQUAL_PAYER_REJECTOR(HttpStatus.BAD_REQUEST, "009", "결제자와 반려자가 같을 수 없습니다."),
	ALREADY_CALCULATE_MEMBER(HttpStatus.BAD_REQUEST, "010", "이미 정산 확인한 사용자입니다."),
	ALREADY_REJECT_COMPLETE(HttpStatus.BAD_REQUEST, "011", "정산 그룹이 반려이거나 정산 완료 된 상태입니다."),
	PAYMENT_NOT_ONGOING(HttpStatus.BAD_REQUEST, "012", "결제가 정산 진행중 상태가 아닙니다"),
	NOT_EXIST_GROUP_MEMBER(HttpStatus.BAD_REQUEST, "003", "정산에 포함된 인원 정보들이 없습니다"),
	//결제
	NOT_EXIST_PAYMENT(HttpStatus.BAD_REQUEST, "001", "결제정보가 존재하지 않습니다."),
	NOT_EXIST_PAYMENT_UNIT(HttpStatus.BAD_REQUEST, "002", "결제 단위가 존재하지 않습니다."),
	NOT_EXIST_PARTICIPANT(HttpStatus.BAD_REQUEST, "003", "존재하지 않는 참가자입니다."),
	DIFFERENT_TOTAL_AMOUNT(HttpStatus.BAD_REQUEST, "004", "결제 총 금액이 틀립니다."),
	NOT_EXIST_PAYER_PAYMENT(HttpStatus.BAD_REQUEST, "004", "결제자는 반드시 결제 내역에 존재해야합니다.(금액을 0으로 하여 넣어도 됩니다.)"),
	DELETE_PAYMENT(HttpStatus.BAD_REQUEST, "005", "제거된 결제는 수정할 수 없습니다."),

	// 계좌
	NOT_EXIST_ACCOUNT(HttpStatus.BAD_REQUEST, "001", "해당 계좌는 존재하지 않습니다."),
	NOT_EXIST_BANK(HttpStatus.NOT_FOUND, "002", "해당 은행이 존재하지 않습니다."),

	// 여행

	NOT_EXIST_TRAVEL_TYPE(HttpStatus.BAD_REQUEST, "011", "잘못된 여행 타입입니다."),
	NOT_EXIST_TRAVEL(HttpStatus.BAD_REQUEST, "012", "존재하지 않는 여행입니다."),
	NOT_EXIST_CITY(HttpStatus.BAD_REQUEST, "013", "존재하지 않는 지역입니다."),
	NOT_EXIST_STATE(HttpStatus.BAD_REQUEST, "014", "존재하지 않는 시도입니다."),
	NOT_EXIST_COUNTRY(HttpStatus.BAD_REQUEST, "015", "존재하지 않는 국가입니다."),

	// 카테고리
	NOT_EXIST_CATEGORY(HttpStatus.BAD_REQUEST, "015", "잘못된 카테고리 타입입니다."),

	// 이미지
	IMAGE_DELETE_FAIL(HttpStatus.EXPECTATION_FAILED, "001", "이미지 삭제에 실패했습니다."),
	CONVERT_FILE_FAIL(HttpStatus.EXPECTATION_FAILED, "002", "파일 전환에 실패했습니다."),
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
