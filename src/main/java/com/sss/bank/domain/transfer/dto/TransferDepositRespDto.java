package com.sss.bank.domain.transfer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class TransferDepositRespDto {

	private String receiverName;

	private Long depositAmount;

}
