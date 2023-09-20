package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class StateException extends BusinessException{

	public StateException(ErrorCode errorCode) {
		super(errorCode);
	}
}
