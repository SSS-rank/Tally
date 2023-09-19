package com.sss.tally.api.token.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class TokenDto {

	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class TokenRespDto{
		private String accessToken;

		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
		private Date accessTokenExpireTime;
		public static TokenRespDto of(String accessToken, Date accessTokenExpireTime){
			return TokenRespDto.builder()
				.accessToken(accessToken)
				.accessTokenExpireTime(accessTokenExpireTime)
				.build();
		}
	}
}
