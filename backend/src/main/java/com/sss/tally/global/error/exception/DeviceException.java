package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class DeviceException extends BusinessException{

	public DeviceException(ErrorCode errorCode) {
		super(errorCode);
	}
}
