package com.sss.bank.api.transfer.controller;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.transfer.dto.TransferDto;
import com.sss.bank.domain.transfer.service.TransferService;
import com.sss.bank.global.resolver.MemberInfo;
import com.sss.bank.global.resolver.MemberInfoDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"09. transfer"}, description = "이체 관련 서비스")
@RequiredArgsConstructor
@RequestMapping("/transfer")
@RestController
public class TransferController {
	private final TransferService transferService;

	@ApiOperation(value = "이체하기", notes = "돈을 이체한다")
	@PostMapping("/deposit")
	public ResponseEntity<TransferDto.TransferDepositRespDto> createTransfer(
		@RequestBody @Valid TransferDto.TransferDepositReqDto transferDepositReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		TransferDto.TransferDepositRespDto transferDepositRespDto = transferService.createTransfer(memberId,
			transferDepositReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(transferDepositRespDto);
	}

	@ApiOperation(value = "이체하기 for Tally", notes = "돈을 이체한다")
	@PostMapping("/deposit/tally")
	public ResponseEntity<TransferDto.TransferDepositRespDto> createTransferTally(
		@RequestBody @Valid TransferDto.TransferDepositReqDto transferDepositReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		TransferDto.TransferDepositRespDto transferDepositRespDto = transferService.createTransferTally(memberId,
			transferDepositReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(transferDepositRespDto);
	}

	@ApiOperation(value = "거래내역 조회", notes = "거래내역을 조회한다 page:0이 1페이지 page:10 이 2페이지")
	@PostMapping("/history")
	public ResponseEntity<List<TransferDto.TransferListRespDto>> getTransferList(
		@RequestBody @Valid TransferDto.TransferListReqDto transferListReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		;
		List<TransferDto.TransferListRespDto> transferListRespDto = transferService.getTransferList(memberId,
			transferListReqDto);

		return ResponseEntity.status(HttpStatus.OK).body(transferListRespDto);
	}

	@ApiOperation(value = "거래내역 조회 for Tally", notes = "거래내역을 조회한다 page:0이 1페이지 page:10 이 2페이지")

	@PostMapping("/history/tally")
	public ResponseEntity<List<TransferDto.TransferListRespDto>> getTransferListTally(
		@RequestBody @Valid TransferDto.TransferListReqDto transferListReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();

		List<TransferDto.TransferListRespDto> transferListRespDto = transferService.getTransferListTally(memberId,
			transferListReqDto);

		return ResponseEntity.status(HttpStatus.OK).body(transferListRespDto);
	}

	@ApiOperation(value = "1원인증", notes = "1원 인증을 진행 후 인증 코드를 받는다 거래내역 조회로 확인")
	@PostMapping("/1transfer")
	public ResponseEntity<String> oneTransfer(
		@RequestBody @Valid TransferDto.OnetransferReqDto onetransferReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();

		String code = transferService.oneTransfer(memberId, onetransferReqDto);

		return ResponseEntity.status(HttpStatus.OK).body("OK");
	}

	@ApiOperation(value = "1원인증 검증", notes = "거래내역 조회로 확인한 code를 3분안에 입력한다.")

	@GetMapping("/1transfer-verify")
	public ResponseEntity<String> oneTransferVerify(
		@RequestBody @Valid TransferDto.OnetransferVerifyReqDto onetransferVerifyReqDto,
		@MemberInfo MemberInfoDto memberInfoDto) {
		long memberId = memberInfoDto.getMemberId();

		String isVerify = transferService.oneTransferVerify(memberId, onetransferVerifyReqDto);

		return ResponseEntity.status(HttpStatus.OK).body(isVerify);
	}

}
