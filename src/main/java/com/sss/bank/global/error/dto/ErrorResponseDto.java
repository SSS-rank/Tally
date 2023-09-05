package com.sss.bank.global.error.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ErrorResponseDto {
	private String errorCode;
	private String errorMessage;

	public static ErrorResponseDto of(String errorCode, String errorMessage) {
		return ErrorResponseDto.builder()
			.errorCode(errorCode)
			.errorMessage(errorMessage)
			.build();
	}
}
