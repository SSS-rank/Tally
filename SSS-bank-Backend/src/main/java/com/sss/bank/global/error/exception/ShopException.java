package com.sss.bank.global.error.exception;

import com.sss.bank.global.error.ErrorCode;

public class ShopException extends BusinessException {

	public ShopException(ErrorCode errorCode) {
		super(errorCode);
	}
}
