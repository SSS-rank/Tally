package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class AccountException extends BusinessException{

	public AccountException(ErrorCode errorCode) {
		super(errorCode);
	}
}
