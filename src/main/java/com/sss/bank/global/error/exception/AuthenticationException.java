package com.sss.bank.global.error.exception;

import com.sss.bank.global.error.ErrorCode;

public class AuthenticationException extends BusinessException{

	public AuthenticationException(ErrorCode errorCode) {
		super(errorCode);
	}
}
