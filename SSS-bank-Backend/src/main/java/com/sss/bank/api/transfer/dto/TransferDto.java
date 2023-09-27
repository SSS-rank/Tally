package com.sss.bank.api.transfer.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

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

	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class TransferLatestRespDto{
		private String transferDate;
		private Long amount;
		private String bankCode;
		private String transferName;
		private String accountNumber;

		public static TransferLatestRespDto from(Transfer transfer){
			DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
			String dateTime = dateTimeFormatter.format(transfer.getTransferDate());
			return TransferLatestRespDto.builder()
				.amount(transfer.getAmount())
				.transferName(transfer.getReceiver().getMemberId().getName())
				.bankCode(transfer.getReceiver().getBankId().getBankCode())
				.accountNumber(transfer.getReceiver().getAccountNumber())
				.transferDate(dateTime)
				.build();
		}
	}

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
		private String bankCode;

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
			String withdrawAccountContent, String depositAccountContent, String bankCode) {
			return TransferDepositReqDto.builder()
				.senderAccountNum(senderAccountNum)
				.receiverAccountNum(receiverAccountNum)
				.depositAmount(depositAmount)
				.withdrawAccountContent(withdrawAccountContent)
				.depositAccountContent(depositAccountContent)
				.bankCode(bankCode)
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
	@Builder
	@AllArgsConstructor
	@Getter
	public static class TransferTallyRespDto{
		private List<TransferListRespDto> tranferList;

		public static TransferTallyRespDto from(List<TransferListRespDto> transferList){
			return TransferTallyRespDto.builder()
				.tranferList(transferList)
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
		private int page;

		@NotNull
		private int limit;

	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	public static class TransferListReqTallyDto {

		@NotNull
		@NotEmpty
		@Size(max = 20)
		private String accountNum;

		@NotNull
		private String accountPasswd;

		@NotNull
		private String startDate;

		@NotNull
		private String endDate;

	}
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@Builder
	@AllArgsConstructor
	@Getter
	public static class TransferListTallyRespDto{
		private List<TransferListRespDto> tranferList;

		public static TransferListTallyRespDto from(List<TransferListRespDto> transferList){
			return TransferListTallyRespDto.builder()
				.tranferList(transferList)
				.build();
		}
	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@Builder
	@AllArgsConstructor
	@Getter
	public static class TransferListRespDto {

		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd HH:mm", timezone = "Asia/Seoul")
		private LocalDateTime transferDate;

		private String flag;

		private Long amount;

		private String content;

		private String transferUuid;

		private Integer shopType;

		public static TransferListRespDto of(LocalDateTime date, String flag, String content, long amount,
			String uuid, Integer shopType) {
			return TransferListRespDto
				.builder()
				.transferDate(date)
				.flag(flag)
				.content(content)
				.amount(amount)
				.transferUuid(uuid)
				.shopType(shopType)
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
