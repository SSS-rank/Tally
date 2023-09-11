package com.sss.bank.api.transfer.controller;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.transfer.dto.TransferDto;
import com.sss.bank.domain.transfer.service.TransferService;
import com.sss.bank.global.resolver.MemberInfo;
import com.sss.bank.global.resolver.MemberInfoDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/transfer")
@RestController
public class TransferController {
	private final TransferService transferService;

	@PostMapping("/deposit")
	public ResponseEntity<TransferDto.TransferDepositRespDto> createTransfer(
		@RequestBody @Valid TransferDto.TransferDepositReqDto transferDepositReqDto,
		BindingResult bindingResult, @MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		TransferDto.TransferDepositRespDto transferDepositRespDto = transferService.createTransfer(memberId,
			transferDepositReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(transferDepositRespDto);
	}

	@PostMapping("/deposit/tally")
	public ResponseEntity<TransferDto.TransferDepositRespDto> createTransferTally(
		@RequestBody @Valid TransferDto.TransferDepositReqDto transferDepositReqDto,
		BindingResult bindingResult, @MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		TransferDto.TransferDepositRespDto transferDepositRespDto = transferService.createTransferTally(memberId,
			transferDepositReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(transferDepositRespDto);
	}

	@PostMapping("/history")
	public ResponseEntity<List<TransferDto.TransferListRespDto>> getTransferList(
		@RequestBody @Valid TransferDto.TransferListReqDto transferListReqDto,
		BindingResult bindingResult, @MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();
		;
		List<TransferDto.TransferListRespDto> transferListRespDto = transferService.getTransferList(memberId,
			transferListReqDto);

		return ResponseEntity.status(HttpStatus.OK).body(transferListRespDto);
	}

	@PostMapping("/history/tally")
	public ResponseEntity<List<TransferDto.TransferListRespDto>> getTransferListTally(
		@RequestBody @Valid TransferDto.TransferListReqDto transferListReqDto,
		BindingResult bindingResult, @MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();

		List<TransferDto.TransferListRespDto> transferListRespDto = transferService.getTransferListTally(memberId,
			transferListReqDto);

		return ResponseEntity.status(HttpStatus.OK).body(transferListRespDto);
	}

	@PostMapping("/1transfer")
	public ResponseEntity<String> oneTransfer(
		@RequestBody @Valid TransferDto.OnetransferReqDto onetransferReqDto,
		BindingResult bindingResult, @MemberInfo MemberInfoDto memberInfoDto) throws NoSuchAlgorithmException {
		long memberId = memberInfoDto.getMemberId();

		String code = transferService.oneTransfer(memberId, onetransferReqDto);

		return ResponseEntity.status(HttpStatus.OK).body("OK");
	}

	@GetMapping("/1transfer-verify")
	public ResponseEntity<String> oneTransferVerify(
		@RequestBody @Valid TransferDto.OnetransferVerifyReqDto onetransferVerifyReqDto,
		BindingResult bindingResult, @MemberInfo MemberInfoDto memberInfoDto) {
		long memberId = memberInfoDto.getMemberId();

		String isVerify = transferService.oneTransferVerify(memberId, onetransferVerifyReqDto);

		return ResponseEntity.status(HttpStatus.OK).body(isVerify);
	}

}
