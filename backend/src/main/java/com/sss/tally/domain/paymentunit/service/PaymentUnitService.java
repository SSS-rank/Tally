package com.sss.tally.domain.paymentunit.service;

import java.util.List;

import com.sss.tally.api.paymentunit.dto.PaymentUnitDto;

public interface PaymentUnitService {
	List<PaymentUnitDto> getPaymentUnitList();
}
