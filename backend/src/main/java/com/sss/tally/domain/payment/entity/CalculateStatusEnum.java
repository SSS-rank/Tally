package com.sss.tally.domain.payment.entity;

public enum CalculateStatusEnum {
	NONE("정산 해당없음"), BEFORE("정산이전"), ONGOING("정산 진행중"), AFTER("정산완료");
	private final String value;

	CalculateStatusEnum(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
