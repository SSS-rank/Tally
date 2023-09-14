package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class MemberException extends BusinessException{

	public MemberException(ErrorCode errorCode) {
		super(errorCode);
	}
}
