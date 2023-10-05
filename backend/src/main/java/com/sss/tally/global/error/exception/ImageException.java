package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class ImageException extends BusinessException {

	public ImageException(ErrorCode errorCode) {
		super(errorCode);
	}
}