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
	@Builder
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

		@NotNull
		private String accountPassword;

		public static TransferDepositReqDto of(String senderAccountNum, String receiverAccountNum, Long depositAmount,
			String withdrawAccountContent, String depositAccountContent) {
			return TransferDepositReqDto.builder()
				.senderAccountNum(senderAccountNum)
				.receiverAccountNum(receiverAccountNum)
				.depositAmount(depositAmount)
				.withdrawAccountContent(withdrawAccountContent)
				.depositAccountContent(depositAccountContent)
				.build();
		}

	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	@Builder
	public static class TransferDepositRespDto {

		private String receiverName;

		private Long depositAmount;

		public static TransferDepositRespDto of(String receiverName, Long depositAmount) {
			return TransferDepositRespDto.builder()
				.receiverName(receiverName)
				.depositAmount(depositAmount)
				.build();
		}

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

		public static TransferListRespDto of(LocalDateTime date, String flag, String content, long amount,
			String uuid) {
			return TransferListRespDto
				.builder()
				.transferDate(date)
				.flag(flag)
				.content(content)
				.amount(amount)
				.transferUuid(uuid)
				.build();
		}
	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	public static class OnetransferReqDto {

		@NotNull
		@NotEmpty
		@Size(max = 20)
		private String accountNum;

		@NotNull
		private String bankCode;

	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	public static class OnetransferVerifyReqDto {

		@NotNull
		@NotEmpty
		@Size(max = 20)
		private String accountNum;

		@Size(max = 4)
		@NotNull
		private String code;

	}

}
