package com.sss.tally.api.payment.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
	public ResponseEntity<String> createPayment(Authentication authentication, @RequestBody PaymentDto.PaymentManualDto paymentManualDto){
		paymentService.createPayment(authentication, paymentManualDto);
		return ResponseEntity.status(HttpStatus.CREATED).body("OK");
	}
}
