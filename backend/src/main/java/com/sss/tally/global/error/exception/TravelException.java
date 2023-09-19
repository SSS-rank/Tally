package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class TravelException extends BusinessException {

	public TravelException(ErrorCode errorCode) {
		super(errorCode);
	}
}
