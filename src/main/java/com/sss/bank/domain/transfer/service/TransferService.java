package com.sss.bank.domain.transfer.service;

import com.sss.bank.domain.transfer.dto.TransferDepositReqDto;
import com.sss.bank.domain.transfer.dto.TransferDepositRespDto;

public interface TransferService {
	TransferDepositRespDto createTransfer(TransferDepositReqDto transferDepositReqDto, long memberId);
}
