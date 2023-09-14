package com.sss.bank.domain.payment.service;

import java.security.NoSuchAlgorithmException;

import com.sss.bank.api.payment.dto.PaymentDto;

public interface PaymentService {
	PaymentDto.PaymentRespDto createPayment(PaymentDto.PaymentReqDto paymentReqDto) throws NoSuchAlgorithmException;
}
