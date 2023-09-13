package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class AuthenticationException extends BusinessException{

	public AuthenticationException(ErrorCode errorCode) {
		super(errorCode);
	}
}
