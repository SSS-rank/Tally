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

	String oneTransfer(TransferDto.OnetransferReqDto onetransferReqDto) throws NoSuchAlgorithmException;

	String oneTransferVerify(TransferDto.OnetransferVerifyReqDto onetransferVerifyReqDto);

	TransferDto.TransferDepositRespDto createTransferTally(
		TransferDto.TransferDepositReqDto transferDepositReqDto) throws
		NoSuchAlgorithmException;

	List<TransferDto.TransferListRespDto> getTransferListTally(
		TransferDto.TransferListReqTallyDto transferListReqDto) throws
		NoSuchAlgorithmException;
}
