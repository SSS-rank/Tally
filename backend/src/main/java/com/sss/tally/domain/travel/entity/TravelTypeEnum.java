package com.sss.tally.domain.travel.entity;

public enum TravelTypeEnum {
	STATE("특별시광역시도"), CITY("시군구"), GLOBAL("국가");
	private final String value;

	TravelTypeEnum(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
