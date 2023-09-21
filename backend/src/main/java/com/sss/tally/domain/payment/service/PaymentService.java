package com.sss.tally.domain.payment.service;

import org.springframework.security.core.Authentication;

import com.sss.tally.api.payment.dto.PaymentDto;

public interface PaymentService {
	void createPayment(Authentication authentication, PaymentDto.PaymentManualDto paymentManualDto);
	void modifyMemo(Authentication authentication, PaymentDto.PaymentMemoDto paymentMemoDto);
	void modifyPaymentManual(Authentication authentication, PaymentDto.PaymentUpdateDto paymentUpdateDto);
}
