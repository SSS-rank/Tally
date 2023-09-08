package com.sss.bank.domain.transfer.service;

import java.util.List;

import com.sss.bank.api.transfer.dto.TransferDto;

public interface TransferService {
	TransferDto.TransferDepositRespDto createTransfer(long memberId,
		TransferDto.TransferDepositReqDto transferDepositReqDto
	);

	List<TransferDto.TransferListRespDto> getTransferList(long memberId,
		TransferDto.TransferListReqDto transferListReqDto);

	String oneTransfer(long memberId, TransferDto.OnetransferReqDto onetransferReqDto);

	String oneTransferVerify(long memberId, TransferDto.OnetransferVerifyReqDto onetransferVerifyReqDto);
}
