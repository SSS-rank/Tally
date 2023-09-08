package com.sss.bank.api.member.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.bank.domain.member.entity.Member;

import lombok.Builder;
import lombok.Getter;

public class MemberDto {

	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class MemberReqDto {
		@NotNull
		@Size(max=10)
		private String name;

		@Size(max=20)
		private String englishName;
	}

	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class MemberRespDto {
		private String name;
		private String englishName;
		public static MemberRespDto from(Member member){
			return MemberRespDto.builder()
				.name(member.getName())
				.englishName(member.getEnglishName())
				.build();
		}
	}
}
