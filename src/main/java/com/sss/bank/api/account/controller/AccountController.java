package com.sss.bank.api.account.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.domain.account.service.AccountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

	private final AccountService accountService;

	@PostMapping("/create")
	public ResponseEntity<Boolean> createAccount() {
		long memberId = 1;
		//	String memberId = loginUser.getMember().memberId();

		Boolean isTrue = accountService.createAccount(memberId);
		return ResponseEntity.status(HttpStatus.CREATED).body(isTrue);
	}
}
