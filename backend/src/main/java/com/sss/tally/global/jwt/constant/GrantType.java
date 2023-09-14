package com.sss.tally.global.jwt.constant;

import lombok.Getter;

@Getter
public enum GrantType {
	BEARER("Bearer");

	GrantType(String type) {
		this.type = type;
	}

	private final String type;
}
