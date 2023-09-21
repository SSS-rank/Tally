package com.sss.tally.domain.payment.service;

import java.util.List;

import org.springframework.security.core.Authentication;

import com.sss.tally.api.payment.dto.PaymentDto;

public interface PaymentService {
	void createPayment(Authentication authentication, PaymentDto.PaymentManualDto paymentManualDto);
	void modifyMemo(Authentication authentication, PaymentDto.PaymentMemoDto paymentMemoDto);
	void modifyPaymentManual(Authentication authentication, PaymentDto.PaymentUpdateDto paymentUpdateDto);

	void modifyPaymentAuto(Authentication authentication, PaymentDto.PaymentCardUpdateDto paymentCardUpdateDto);
	List<PaymentDto.PaymentListDto> getPaymentList(Authentication authentication, Long travelId);
}
