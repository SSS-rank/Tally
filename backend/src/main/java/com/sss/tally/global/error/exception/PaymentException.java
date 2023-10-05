package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class PaymentException extends BusinessException {

	public PaymentException(ErrorCode errorCode) {
		super(errorCode);
	}
}
