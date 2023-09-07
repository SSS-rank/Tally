package com.sss.bank.api.transfer.dto;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.bank.domain.transfer.entity.Transfer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TransferDto {
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
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

		@Column
		private String withdrawAccountContent;

		@Column
		private String depositAccountContent;

	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	public static class TransferDepositRespDto {

		private String receiverName;

		private Long depositAmount;

	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	public static class TransferListReqDto {

		@NotNull
		@NotEmpty
		@Size(max = 20)
		private String accountNum;

		@NotNull
		private String accountPassword;

		@NotNull
		private int page;

		@NotNull
		private int limit;

	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@Builder
	@AllArgsConstructor
	@Getter
	public static class TransferListRespDto {

		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone = "Asia/Seoul")
		private LocalDateTime transferDate;

		private String flag;

		private Long amount;

		private String content;

		private String transferUuid;

		public static TransferListRespDto of(Transfer transfer, String flag) {
			return TransferListRespDto
				.builder()
				.transferDate(transfer.getTransferDate())
				.flag(flag)
				.content(transfer.getDepositAccountContent())
				.amount(transfer.getAmount())
				.transferUuid(transfer.getTransferUuid())
				.build();
		}

	}
}
