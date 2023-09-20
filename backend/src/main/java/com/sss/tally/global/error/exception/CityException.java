package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class CityException extends BusinessException{

	public CityException(ErrorCode errorCode) {
		super(errorCode);
	}
}
