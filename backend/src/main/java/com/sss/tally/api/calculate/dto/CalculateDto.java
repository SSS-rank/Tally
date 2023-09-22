package com.sss.tally.api.calculate.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.persistence.Column;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.caculategroup.entity.CalculateGroup;
import com.sss.tally.domain.caculategroup.entity.CalculateGroupStatusEnum;
import com.sss.tally.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CalculateDto {

	@NoArgsConstructor
	@Getter
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class CalculateCreateReqDto {
		@NotNull
		private String paymentUuid;
	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@Getter
	public static class GetRequestCalculateListRespDto {

		private String calculateGroupUuid;

		private Long amount;

		private CalculateGroupStatusEnum status;

		private String createdTime;

		public static GetRequestCalculateListRespDto of(Long amount, CalculateGroup calculateGroup) {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
			String formattedTime = calculateGroup.getCreateDate().format(formatter);
			return GetRequestCalculateListRespDto.builder()
				.amount(amount)
				.calculateGroupUuid(calculateGroup.getCalculateGroupUuid())
				.createdTime(formattedTime)
				.status(calculateGroup.getStatus())
				.build();
		}
	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@Getter
	public static class GetResponseCalculateListRespDto {

		private String calculateGroupUuid;

		private Long amount;

		private CalculateGroupStatusEnum status;

		private String createdTime;

		private String receiverName;

		public static GetResponseCalculateListRespDto of(Long amount, CalculateGroup calculateGroup) {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
			String formattedTime = calculateGroup.getCreateDate().format(formatter);
			return GetResponseCalculateListRespDto.builder()
				.amount(amount)
				.calculateGroupUuid(calculateGroup.getCalculateGroupUuid())
				.createdTime(formattedTime)
				.status(calculateGroup.getStatus())
				.receiverName(calculateGroup.getMemberId().getNickname())
				.build();
		}
	}

	@NoArgsConstructor
	@Getter
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class CalculateRejectReqDto {
		@NotNull
		private String calculateGroupUuid;

		@NotNull
		private String content;
	}

	@NoArgsConstructor
	@Getter
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class GetResponseCalculateDetailReqDto {
		@NotNull
		private String calculateGroupUuid;

	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@Getter
	public static class GetResponseCalculateDetailRespDto {

		private String travelType;

		private String travelName;

		private String requestDate;

		private Long totalAmount;

		private List<Detail> detailList;

		public static GetResponseCalculateDetailRespDto of
			(String travelType, String travelName, LocalDateTime date, Long totalAmount, List<Detail> detailList) {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
			String formattedTime = date.format(formatter);
			return GetResponseCalculateDetailRespDto.builder()
				.detailList(detailList)
				.totalAmount(totalAmount)
				.travelName(travelName)
				.travelType(travelType)
				.requestDate(formattedTime)
				.build();
		}

	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@Getter
	public static class Detail {

		private String paymentName;

		private int myAmount;

		private int allAmount;

		private LocalDateTime paymentDate;

	}

	@NoArgsConstructor
	@Getter
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class CalculateAcceptReqDto {
		@NotNull
		private String calculateGroupUuid;

		@NotNull
		private String accountNumber;

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
			String withdrawAccountContent, String depositAccountContent, String bankCode, String accountPassword) {
			return TransferDepositReqDto.builder()
				.senderAccountNum(senderAccountNum)
				.receiverAccountNum(receiverAccountNum)
				.depositAmount(depositAmount)
				.withdrawAccountContent(withdrawAccountContent)
				.depositAccountContent(depositAccountContent)
				.bankCode(bankCode)
				.accountPassword(accountPassword)
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

	@NoArgsConstructor
	@Getter
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class GetRequestCalculateDetailReqDto {
		@NotNull
		private String calculateGroupUuid;

	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@Getter
	public static class GetRequestCalculateDetailRespDto {

		private String travelType;

		private String travelName;

		private String requestDate;

		private Long totalAmount;

		private List<RequestDetail> requestDetails;

		public static GetRequestCalculateDetailRespDto of
			(String travelType, String travelName, LocalDateTime date, Long totalAmount,
				List<RequestDetail> requestDetails) {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
			String formattedTime = date.format(formatter);
			return GetRequestCalculateDetailRespDto.builder()
				.requestDetails(requestDetails)
				.totalAmount(totalAmount)
				.travelName(travelName)
				.travelType(travelType)
				.requestDate(formattedTime)
				.build();
		}

	}

	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@Getter
	public static class RequestDetail {

		private String memberName;

		private String memberProfile;

		private Long amount;

		private String status;

		public static RequestDetail of(Member member, String status, Long amount) {
			return RequestDetail.builder()
				.memberName(member.getNickname())
				.memberProfile(member.getProfileImage())
				.status(status)
				.amount(amount)
				.build();
		}

	}

}