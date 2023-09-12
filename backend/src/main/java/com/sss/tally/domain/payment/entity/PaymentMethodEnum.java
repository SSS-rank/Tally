package com.sss.tally.domain.payment.entity;

public enum PaymentMethodEnum {
	CARD("카드"), CASH("현금");
	private final String value;

	PaymentMethodEnum(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
