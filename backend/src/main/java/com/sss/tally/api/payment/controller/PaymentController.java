package com.sss.tally.api.payment.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.payment.dto.PaymentDto;
import com.sss.tally.domain.payment.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/payment")
public class PaymentController {
	private final PaymentService paymentService;
	@PostMapping("/manual")
	public ResponseEntity<String> createPayment(Authentication authentication, @RequestBody @Valid PaymentDto.PaymentManualDto paymentManualDto){
		paymentService.createPayment(authentication, paymentManualDto);
		return ResponseEntity.status(HttpStatus.CREATED).body("OK");
	}

	@PatchMapping("/memo")
	public ResponseEntity<String> modifyPaymentMemo(Authentication authentication, @RequestBody
		@Valid PaymentDto.PaymentMemoDto paymentMemoDto){
		paymentService.modifyMemo(authentication, paymentMemoDto);
		return ResponseEntity.status(HttpStatus.OK).body("OK");
	}
	@PatchMapping("/manual")
	public ResponseEntity<String> modifyPaymentManual(Authentication authentication, @RequestBody @Valid PaymentDto.PaymentUpdateDto paymentUpdateDto){
		paymentService.modifyPaymentManual(authentication, paymentUpdateDto);
		return ResponseEntity.status(HttpStatus.OK).body("OK");
	}
}
