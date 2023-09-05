package com.sss.bank.global.error.dto;

import java.util.List;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

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

	public static ErrorResponseDto of(String errorCode, BindingResult bindingResult) {
		return ErrorResponseDto.builder()
			.errorCode(errorCode)
			.errorMessage(createErrorMessage(bindingResult))
			.build();
	}

	private static String createErrorMessage(BindingResult bindingResult) {
		StringBuilder sb = new StringBuilder();
		boolean isFirst = true;
		List<FieldError> fieldErrors = bindingResult.getFieldErrors();
		for (FieldError fieldError : fieldErrors) {
			if (!isFirst) {
				sb.append(", ");
			} else {
				isFirst = false;
			}
			sb.append("[");
			sb.append(fieldError.getField());
			sb.append("]");
			sb.append(fieldError.getDefaultMessage());
		}
		return sb.toString();
	}
}
