package com.sss.tally.api.memberpayment.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

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
		private int amount;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class MemberPaymentRespDto{
		private String memberUuid;
		private int amount;
		private String nickname;
		private String profileImage;
		private boolean payer;
		private boolean with;
	}
}
