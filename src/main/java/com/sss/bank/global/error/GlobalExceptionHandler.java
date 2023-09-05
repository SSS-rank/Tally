package com.sss.bank.global.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.sss.bank.global.error.dto.ErrorResponseDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(BindException.class)
	protected ResponseEntity<ErrorResponseDto> handleBindException(BindException e) {
		log.error("handleBindException", e);
		ErrorResponseDto errorResponseDto = ErrorResponseDto.of(HttpStatus.BAD_REQUEST.toString(),
			e.getBindingResult());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponseDto);
	}

	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	protected ResponseEntity<ErrorResponseDto> handleMethodArgumentTypeMismatchException(
		MethodArgumentTypeMismatchException e) {
		log.error("hadleMethodArgumentTypeMismatchException", e);
		ErrorResponseDto errorResponseDto = ErrorResponseDto.of(HttpStatus.BAD_REQUEST.toString(), e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(errorResponseDto);
	}
}
