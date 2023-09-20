package com.sss.tally.domain.payment.service;

import org.springframework.security.core.Authentication;

import com.sss.tally.api.payment.dto.PaymentDto;

public interface PaymentService {
	void createPayment(Authentication authentication, PaymentDto.PaymentManualDto paymentManualDto);
}
