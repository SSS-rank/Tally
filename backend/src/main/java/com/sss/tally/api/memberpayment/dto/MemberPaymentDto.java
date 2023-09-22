package com.sss.tally.api.memberpayment.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.memberpayment.entity.MemberPayment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MemberPaymentDto {

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class MemberPaymentCreateDto{
		private String memberUuid;
		private Long amount;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class MemberPaymentRespDto{
		private String memberUuid;
		private Long amount;
		private String nickname;
		private String profileImage;
		private boolean payer;
		private boolean with;

		public static MemberPaymentRespDto of(MemberPayment memberPayment, boolean payer){
			return MemberPaymentRespDto.builder()
					.memberUuid(memberPayment.getMemberId().getMemberUuid())
					.amount(memberPayment.getAmount())
					.nickname(memberPayment.getMemberId().getNickname())
					.nickname(memberPayment.getMemberId().getNickname())
					.profileImage(memberPayment.getMemberId().getProfileImage())
					.with(!memberPayment.getStatus())
					.payer(payer)
					.build();
		}
	}
}
