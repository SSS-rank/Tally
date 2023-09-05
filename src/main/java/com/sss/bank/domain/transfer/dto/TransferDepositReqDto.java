package com.sss.bank.domain.transfer.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.sss.bank.domain.account.entity.Account;
import com.sss.bank.domain.transfer.entity.Transfer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class TransferDepositReqDto {

	@NotNull
	@NotEmpty
	@Size(max = 20)
	private String senderAccountNum;

	@NotNull
	@NotEmpty
	@Size(max = 20)
	private String receiverAccountNum;

	@NotNull
	@Max(100000000)
	@Min(1)
	private Long depositAmount;

	public Transfer toTransferEntity(String uuid, Account sender, Account receiver) {
		return Transfer
			.builder()
			.transferUuid(uuid)
			.sender(sender)
			.receiver(receiver)
			.amount(this.depositAmount)
			.build();
	}
}
