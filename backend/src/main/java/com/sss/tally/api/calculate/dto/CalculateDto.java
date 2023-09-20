package com.sss.tally.api.calculate.dto;

import java.time.format.DateTimeFormatter;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.caculategroup.entity.CalculateGroup;
import com.sss.tally.domain.caculategroup.entity.CalculateGroupStatusEnum;

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
		private String calculateGruopUuid;

		@NotNull
		private String content;
	}

}
