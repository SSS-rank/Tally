package com.sss.tally.api.account.controller;

import java.security.NoSuchAlgorithmException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.account.dto.AccountDto;
import com.sss.tally.domain.account.service.AccountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {

	private final AccountService accountService;
	@PostMapping
	public ResponseEntity<String> createAccount(Authentication authentication, @RequestBody AccountDto.AccountCreateReqDto accountCreateReqDto) throws
		NoSuchAlgorithmException {
		accountService.createAccount(authentication, accountCreateReqDto);
		return ResponseEntity.status(HttpStatus.OK).body("Success");
	}
}
