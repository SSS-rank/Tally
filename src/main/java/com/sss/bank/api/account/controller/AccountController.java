package com.sss.bank.api.account.controller;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.account.dto.AccountDto;
import com.sss.bank.domain.account.service.AccountService;
import com.sss.bank.global.resolver.MemberInfo;
import com.sss.bank.global.resolver.MemberInfoDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

	private final AccountService accountService;

	@PostMapping
	public ResponseEntity<String> createAccount(
		@RequestBody @Valid AccountDto.AccountCreateReqDto accountCreateReqDto, BindingResult bindingResult) throws
		NoSuchAlgorithmException {
		long memberId = 1;
		//	String memberId = loginUser.getMember().memberId();
		Boolean isTrue = accountService.createAccount(memberId, accountCreateReqDto);
		return ResponseEntity.status(HttpStatus.CREATED).body("OK");
	}

	@PatchMapping
	public ResponseEntity<String> deleteAccount(
		@RequestBody @Valid AccountDto.AccountDeleteReqDto accountDeleteReqDto, BindingResult bindingResult) throws
		NoSuchAlgorithmException {
		long memberId = 1;
		Boolean isSuccess = accountService.deleteAccount(memberId, accountDeleteReqDto);
		return ResponseEntity.status(HttpStatus.OK).body("삭제 성공");
	}

	@PostMapping("/get-balance")
	public ResponseEntity<AccountDto.AccountGetBalanceRespDto> getBalance(
		@RequestBody @Valid AccountDto.AccountGetBalanceReqDto accountGetBalanceReqDto,
		BindingResult bindingResult) throws NoSuchAlgorithmException {
		long memberId = 1;
		AccountDto.AccountGetBalanceRespDto accountGetBalanceRespDto = accountService.getBalance(memberId,
			accountGetBalanceReqDto);

		return ResponseEntity.status(HttpStatus.OK).body(accountGetBalanceRespDto);

	}

	@GetMapping
	public ResponseEntity<List<AccountDto>> getAccountList(@RequestParam String code,
		@MemberInfo MemberInfoDto memberInfoDto) {
		List<AccountDto> accountList = accountService.getAccountList(memberInfoDto, code);
		return ResponseEntity.status(HttpStatus.OK).body(accountList);
	}
}
