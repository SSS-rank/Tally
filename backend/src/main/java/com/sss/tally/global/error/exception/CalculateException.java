package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class CalculateException extends BusinessException {

	public CalculateException(ErrorCode errorCode) {
		super(errorCode);
	}
}
