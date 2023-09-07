package com.sss.bank.domain.payment.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.api.payment.dto.PaymentDto;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
	@Override
	public PaymentDto.PaymentRespDto createPayment(PaymentDto.PaymentRespDto paymentRespDto) {
		return null;
	}
}
