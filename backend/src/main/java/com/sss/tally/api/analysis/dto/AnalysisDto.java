package com.sss.tally.api.analysis.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class AnalysisDto {

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class GroupMemberRespInfo{
		private String memberName;
		private Long money;
		private double percent;
		private Boolean login;
		private String memberUuid;
		public static GroupMemberRespInfo of(String memberName, Long money, double percent, Boolean login, String memberUuid){
			return GroupMemberRespInfo.builder()
				.memberName(memberName)
				.money(money)
				.percent(Math.round(percent*100.0)/100.0)
				.login(login)
				.memberUuid(memberUuid)
				.build();
		}
	}

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class GroupMemberRespDto{
		List<GroupMemberRespInfo> list;
		Long totalAmount;
		public static GroupMemberRespDto of(List<GroupMemberRespInfo> list, Long totalAmount){
			return GroupMemberRespDto.builder()
				.list(list)
				.totalAmount(totalAmount)
				.build();
		}
	}


	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class MemberRespInfo{
		private Long categoryId;
		private String categoryType;
		private double percent;
		private Long money;
		public static MemberRespInfo of(Long categoryId, String categoryType, double percent, Long money){
			return MemberRespInfo.builder()
				.categoryId(categoryId)
				.categoryType(categoryType)
				.percent(Math.round(percent*100.0)/100.0)
				.money(money)
				.build();
		}
	}

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class MemberRespDto{
		List<MemberRespInfo> list;
		Long totalAmount;
		public static MemberRespDto of(List<MemberRespInfo> list, Long totalAmount){
			return MemberRespDto.builder()
				.list(list)
				.totalAmount(totalAmount)
				.build();
		}
	}

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class CategoryRespDto{
		@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
		private LocalDateTime paymentKoreaDate;
		private String paymentUuid;
		private String paymentTitle;
		private List<String> tagMember;
		private Long totalMoney;
		private Long myMoney;
		public static CategoryRespDto of(
			LocalDateTime paymentKoreaDate, String paymentUuid, String paymentTitle, List<String> tagMember, Long totalMoney, Long myMoney
		){
			return CategoryRespDto.builder()
				.paymentKoreaDate(paymentKoreaDate)
				.paymentUuid(paymentUuid)
				.paymentTitle(paymentTitle)
				.tagMember(tagMember)
				.totalMoney(totalMoney)
				.myMoney(myMoney)
				.build();
		}
	}


	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class ChangeCategoryReqDto{
		private String paymentUuid;
		private Long categoryId;
	}
}
