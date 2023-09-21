package com.sss.tally.api.account.controller;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@PatchMapping("/{accountId}")
	public ResponseEntity<String> deleteAccount(@PathVariable Long accountId){
		accountService.deleteAccount(accountId);
		return ResponseEntity.status(HttpStatus.OK).body("Delete Success");
	}

	@GetMapping("/balance/{accountId}")
	public ResponseEntity<Long> getBalance(@PathVariable Long accountId){
		Long balance = accountService.getBalance(accountId);
		return ResponseEntity.status(HttpStatus.OK).body(balance);
	}

	@GetMapping
	public ResponseEntity<List<AccountDto.AccountRespDto>> getAccountList(Authentication authentication){
		List<AccountDto.AccountRespDto> accountRespDtoList = accountService.getAccountList(authentication);
		return ResponseEntity.status(HttpStatus.OK).body(accountRespDtoList);
	}

	@PatchMapping("/main/{accountId}")
	public ResponseEntity<String> updateMainAccount(Authentication authentication, @PathVariable Long accountId){
		accountService.updateMainAccount(authentication, accountId);
		return ResponseEntity.status(HttpStatus.OK).body("Update Success");
	}
}
