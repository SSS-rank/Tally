package com.sss.bank.api.transfer.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.transfer.dto.TransferDto;
import com.sss.bank.domain.transfer.service.TransferService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/transfer")
@RestController
public class TransferController {
	private final TransferService transferService;

	@PostMapping("/deposit")
	public ResponseEntity<TransferDto.TransferDepositRespDto> createTransfer(
		@RequestBody @Valid TransferDto.TransferDepositReqDto transferDepositReqDto,
		BindingResult bindingResult) {
		long memberId = 1;
		//String memberUuid = loginUser.getMember().getMemberUuid();
		TransferDto.TransferDepositRespDto transferDepositRespDto = transferService.createTransfer(memberId,
			transferDepositReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(transferDepositRespDto);
	}

	@PostMapping("/history")
	public ResponseEntity<List<TransferDto.TransferListRespDto>> getTransferList(
		@RequestBody @Valid TransferDto.TransferListReqDto transferListReqDto,
		BindingResult bindingResult) {
		long memberId = 1;

		List<TransferDto.TransferListRespDto> transferListRespDto = transferService.getList(memberId,
			transferListReqDto);

		return ResponseEntity.status(HttpStatus.OK).body(transferListRespDto);
	}
}
