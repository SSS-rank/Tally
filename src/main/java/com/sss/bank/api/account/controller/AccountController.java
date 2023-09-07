package com.sss.bank.api.account.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.account.dto.AccountDto;
import com.sss.bank.domain.account.service.AccountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

	private final AccountService accountService;

	@PostMapping("/create")
	public ResponseEntity<String> createAccount(
		@RequestBody @Valid AccountDto.AccountCreateReqDto accountCreateReqDto, BindingResult bindingResult) {
		long memberId = 1;
		//	String memberId = loginUser.getMember().memberId();
		Boolean isTrue = accountService.createAccount(memberId, accountCreateReqDto);
		return ResponseEntity.status(HttpStatus.CREATED).body("OK");
	}

	@PostMapping("/delete")
	public ResponseEntity<String> deleteAccount(
		@RequestBody @Valid AccountDto.AccountDeleteReqDto accountDeleteReqDto, BindingResult bindingResult) {
		long memberId = 1;
		Boolean isSuccess = accountService.deleteAccount(memberId, accountDeleteReqDto);
		return ResponseEntity.status(HttpStatus.OK).body("삭제 성공");
	}
}
