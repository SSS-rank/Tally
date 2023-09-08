package com.sss.bank.domain.payment.service;

import com.sss.bank.api.payment.dto.PaymentDto;

public interface PaymentService {
	PaymentDto.PaymentRespDto createPayment(PaymentDto.PaymentRespDto paymentRespDto);
}
