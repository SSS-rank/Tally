package com.sss.bank.domain.transfer.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class TransferDto {

	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	public static class TransferDepositReqDto {

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

	}

	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	public static class TransferDepositRespDto {

		private String receiverName;

		private Long depositAmount;

	}
}
