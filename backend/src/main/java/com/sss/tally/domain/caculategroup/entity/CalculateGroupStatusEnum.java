package com.sss.tally.domain.caculategroup.entity;

public enum CalculateGroupStatusEnum {
	REJECT("반려"), ONGOING("정산 진행중"), COMPLETE("정산완료");
	private final String value;

	CalculateGroupStatusEnum(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
