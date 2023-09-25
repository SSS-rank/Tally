package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class CustomCheckListException extends BusinessException {

	public CustomCheckListException(ErrorCode errorCode) {
		super(errorCode);
	}
}
