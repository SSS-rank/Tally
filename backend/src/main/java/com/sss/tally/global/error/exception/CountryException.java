package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class CountryException extends BusinessException {

	public CountryException(ErrorCode errorCode) {
		super(errorCode);
	}
}
