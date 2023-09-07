package com.sss.bank.domain.transfer.service;

import java.util.List;

import com.sss.bank.api.transfer.dto.TransferDto;

public interface TransferService {
	TransferDto.TransferDepositRespDto createTransfer(TransferDto.TransferDepositReqDto transferDepositReqDto,
		long memberId);

	List<TransferDto.TransferListRespDto> getList(long memberId, TransferDto.TransferListReqDto transferListReqDto);
}
