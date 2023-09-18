package com.sss.bank.global.error.exception;

import com.sss.bank.global.error.ErrorCode;

public class PaymentException extends BusinessException {

	public PaymentException(ErrorCode errorCode) {
		super(errorCode);
	}
}
