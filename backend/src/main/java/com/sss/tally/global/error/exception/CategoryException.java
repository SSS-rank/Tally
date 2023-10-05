package com.sss.tally.global.error.exception;

import com.sss.tally.global.error.ErrorCode;

public class CategoryException extends BusinessException {

	public CategoryException(ErrorCode errorCode) {
		super(errorCode);
	}
}
