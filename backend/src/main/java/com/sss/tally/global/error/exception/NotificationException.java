package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class NotificationException extends BusinessException {

	public NotificationException(ErrorCode errorCode) {
		super(errorCode);
	}
}
