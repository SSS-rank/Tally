package com.sss.bank.api.payment.controller;

import java.security.NoSuchAlgorithmException;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.payment.dto.PaymentDto;
import com.sss.bank.domain.payment.service.PaymentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"06. payment"}, description = "결제 관련 서비스")
@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {
	private final PaymentService paymentService;

	@ApiOperation(value = "결제 진행", notes = "결제를 진행한다.")
	@PostMapping
	public ResponseEntity<PaymentDto.PaymentRespDto> createPayment(
		@RequestBody @Valid PaymentDto.PaymentReqDto paymentReqDto) throws NoSuchAlgorithmException {
		PaymentDto.PaymentRespDto payment = paymentService.createPayment(paymentReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(payment);
	}
}
