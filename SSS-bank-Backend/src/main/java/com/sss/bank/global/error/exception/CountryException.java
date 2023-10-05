package com.sss.bank.global.error.exception;

import com.sss.bank.global.error.ErrorCode;

public class CountryException extends BusinessException {

	public CountryException(ErrorCode errorCode) {
		super(errorCode);
	}
}
