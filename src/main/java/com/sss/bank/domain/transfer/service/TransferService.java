package com.sss.bank.domain.transfer.service;

import com.sss.bank.api.transfer.dto.TransferDto;

public interface TransferService {
	TransferDto.TransferDepositRespDto createTransfer(TransferDto.TransferDepositReqDto transferDepositReqDto,
		long memberId);
}
