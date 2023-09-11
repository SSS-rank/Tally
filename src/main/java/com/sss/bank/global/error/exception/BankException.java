package com.sss.bank.global.error.exception;

import com.sss.bank.global.error.ErrorCode;

public class BankException extends BusinessException {

	public BankException(ErrorCode errorCode) {
		super(errorCode);
	}
}
