package com.sss.bank.domain.transfer.service;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.sss.bank.api.transfer.dto.TransferDto;

public interface TransferService {
	TransferDto.TransferDepositRespDto createTransfer(long memberId,
		TransferDto.TransferDepositReqDto transferDepositReqDto
	) throws NoSuchAlgorithmException;

	List<TransferDto.TransferListRespDto> getTransferList(long memberId,
		TransferDto.TransferListReqDto transferListReqDto) throws NoSuchAlgorithmException;

	String oneTransfer(long memberId, TransferDto.OnetransferReqDto onetransferReqDto) throws NoSuchAlgorithmException;

	String oneTransferVerify(long memberId, TransferDto.OnetransferVerifyReqDto onetransferVerifyReqDto);

	TransferDto.TransferDepositRespDto createTransferTally(long memberId,
		TransferDto.TransferDepositReqDto transferDepositReqDto) throws
		NoSuchAlgorithmException;

	List<TransferDto.TransferListRespDto> getTransferListTally(long memberId,
		TransferDto.TransferListReqDto transferListReqDto) throws
		NoSuchAlgorithmException;
}