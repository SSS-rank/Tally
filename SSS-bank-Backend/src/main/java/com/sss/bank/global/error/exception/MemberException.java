package com.sss.bank.global.error.exception;

import com.sss.bank.global.error.ErrorCode;

public class MemberException extends BusinessException {

	public MemberException(ErrorCode errorCode) {
		super(errorCode);
	}
}
