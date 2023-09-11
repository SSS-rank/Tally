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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"01. account"}, description = "계좌 관련 서비스")
@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

	private final AccountService accountService;

	@ApiOperation(value = "계좌 생성", notes = "계좌를 생성한다")
	@PostMapping
	public ResponseEntity<String> createAccount(
		@RequestBody @Valid AccountDto.AccountCreateReqDto accountCreateReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) throws
		NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		Boolean isTrue = accountService.createAccount(memberId, accountCreateReqDto);
		return ResponseEntity.status(HttpStatus.CREATED).body("OK");
	}

	@ApiOperation(value = "계좌 삭제", notes = "계좌를 삭제한다")
	@PatchMapping
	public ResponseEntity<String> deleteAccount(
		@RequestBody @Valid AccountDto.AccountDeleteReqDto accountDeleteReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) throws
		NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		Boolean isSuccess = accountService.deleteAccount(memberId, accountDeleteReqDto);
		return ResponseEntity.status(HttpStatus.OK).body("삭제 성공");
	}

	@ApiOperation(value = "잔액 조회", notes = "잔액을 조회한다")
	@PostMapping("/get-balance")
	public ResponseEntity<AccountDto.AccountGetBalanceRespDto> getBalance(
		@RequestBody @Valid AccountDto.AccountGetBalanceReqDto accountGetBalanceReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		AccountDto.AccountGetBalanceRespDto accountGetBalanceRespDto = accountService.getBalance(memberId,
			accountGetBalanceReqDto);

		return ResponseEntity.status(HttpStatus.OK).body(accountGetBalanceRespDto);

	}

	@ApiOperation(value = "잔액 조회 for Tally", notes = "잔액을 조회한다")
	@PostMapping("/get-balance/tally")
	public ResponseEntity<AccountDto.AccountGetBalanceRespDto> getBalanceTally(
		@RequestBody @Valid AccountDto.AccountGetBalanceReqDto accountGetBalanceReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		AccountDto.AccountGetBalanceRespDto accountGetBalanceRespDto = accountService.getBalanceTally(memberId,
			accountGetBalanceReqDto);

		return ResponseEntity.status(HttpStatus.OK).body(accountGetBalanceRespDto);

	}

	@ApiOperation(value = "계좌리스트 조회", notes = "계좌리스트를 조회한다")
	@GetMapping
	public ResponseEntity<List<AccountDto>> getAccountList(@RequestParam String code,
		@MemberInfo MemberInfoDto memberInfoDto) {
		List<AccountDto> accountList = accountService.getAccountList(memberInfoDto, code);
		return ResponseEntity.status(HttpStatus.OK).body(accountList);
	}

	@ApiOperation(value = "예금주 조회", notes = "예금주를 조회한다.")
	@GetMapping("/owner/{accountNumber}")
	public ResponseEntity<AccountDto.AccountGetOwnerDto> getAccountOwner(@PathVariable String accountNumber) {
		AccountDto.AccountGetOwnerDto owner = accountService.getAccountOwner(accountNumber);
		return ResponseEntity.status(HttpStatus.OK).body(owner);
	}
}
