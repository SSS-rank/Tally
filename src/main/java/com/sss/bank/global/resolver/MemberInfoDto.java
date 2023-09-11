package com.sss.bank.global.resolver;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberInfoDto {
	private Long memberId;

	public static MemberInfoDto from(Long memberId){
		return MemberInfoDto.builder()
			.memberId(memberId)
			.build();
	}
}
