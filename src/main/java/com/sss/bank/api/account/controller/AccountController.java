package com.sss.bank.api.account.controller;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	public ResponseEntity<AccountDto.AccountCreateRespDto> createAccount(
		@RequestBody @Valid AccountDto.AccountCreateReqDto accountCreateReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) throws
		NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		AccountDto.AccountCreateRespDto accountCreateRespDto = accountService.createAccount(memberId,
			accountCreateReqDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(accountCreateRespDto);
	}

	@PatchMapping
	public ResponseEntity<String> deleteAccount(
		@RequestBody @Valid AccountDto.AccountDeleteReqDto accountDeleteReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) throws
		NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		Boolean isSuccess = accountService.deleteAccount(memberId, accountDeleteReqDto);
		return ResponseEntity.status(HttpStatus.OK).body("삭제 성공");
	}

	@PostMapping("/get-balance")
	public ResponseEntity<AccountDto.AccountGetBalanceRespDto> getBalance(
		@RequestBody @Valid AccountDto.AccountGetBalanceReqDto accountGetBalanceReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		AccountDto.AccountGetBalanceRespDto accountGetBalanceRespDto = accountService.getBalance(memberId,
			accountGetBalanceReqDto);

		return ResponseEntity.status(HttpStatus.OK).body(accountGetBalanceRespDto);

	}

	@PostMapping("/get-balance/tally")
	public ResponseEntity<AccountDto.AccountGetBalanceRespDto> getBalanceTally(
		@RequestBody @Valid AccountDto.AccountGetBalanceReqDto accountGetBalanceReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		AccountDto.AccountGetBalanceRespDto accountGetBalanceRespDto = accountService.getBalanceTally(memberId,
			accountGetBalanceReqDto);

		return ResponseEntity.status(HttpStatus.OK).body(accountGetBalanceRespDto);

	}

	@GetMapping
	public ResponseEntity<List<AccountDto>> getAccountList(@RequestParam String code,
		@MemberInfo MemberInfoDto memberInfoDto) {
		List<AccountDto> accountList = accountService.getAccountList(memberInfoDto, code);
		return ResponseEntity.status(HttpStatus.OK).body(accountList);
	}

	@GetMapping("/owner/{accountNumber}")
	public ResponseEntity<AccountDto.AccountGetOwnerDto> getAccountOwner(@PathVariable String accountNumber) {
		AccountDto.AccountGetOwnerDto owner = accountService.getAccountOwner(accountNumber);
		return ResponseEntity.status(HttpStatus.OK).body(owner);
	}
}
