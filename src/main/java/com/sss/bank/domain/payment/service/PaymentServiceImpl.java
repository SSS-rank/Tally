package com.sss.bank.domain.payment.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.api.payment.dto.PaymentDto;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
	@Override
	public PaymentDto.PaymentRespDto createPayment(PaymentDto.PaymentRespDto paymentRespDto) {
		// 1. 비밀 번호 체크

		// 2. 존재하는 shop인지 확인

		// 3. 존재하는 sender 인지 확인

		// 4. 잔액 확인

		// 5. 결제
		return null;
	}
}
