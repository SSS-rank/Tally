package com.sss.tally.api.paymentunit.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.paymentunit.dto.PaymentUnitDto;
import com.sss.tally.domain.paymentunit.service.PaymentUnitService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment-unit")
public class PaymentUnitController {
	private final PaymentUnitService paymentUnitService;
	@GetMapping
	public ResponseEntity<List<PaymentUnitDto>> getPaymentUnitList(){
		List<PaymentUnitDto> paymentUnitList = paymentUnitService.getPaymentUnitList();
		return ResponseEntity.status(HttpStatus.OK).body(paymentUnitList);
	}
}
