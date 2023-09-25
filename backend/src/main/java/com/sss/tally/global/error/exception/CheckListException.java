package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class CheckListException extends BusinessException {

	public CheckListException(ErrorCode errorCode) {
		super(errorCode);
	}
}
