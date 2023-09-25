package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class DefaultCheckListException extends BusinessException {

	public DefaultCheckListException(ErrorCode errorCode) {
		super(errorCode);
	}
}
