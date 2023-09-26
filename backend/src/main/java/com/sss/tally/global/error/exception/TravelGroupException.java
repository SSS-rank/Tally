package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class TravelGroupException extends BusinessException {

	public TravelGroupException(ErrorCode errorCode) {
		super(errorCode);
	}
}
