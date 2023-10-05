package com.sss.bank.global.error.exception;

import com.sss.bank.global.error.ErrorCode;

public class AccountException extends BusinessException {

	public AccountException(ErrorCode errorCode) {
		super(errorCode);
	}
}
