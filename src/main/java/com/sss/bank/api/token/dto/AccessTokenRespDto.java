package com.sss.bank.api.token.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccessTokenRespDto {
	private String grantType;
	private String accessToken;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
	private Date accessTokenExpireTime;

	public static AccessTokenRespDto of (String grantType, String accessToken, Date accessTokenExpireTime){
		return AccessTokenRespDto.builder()
			.grantType(grantType)
			.accessToken(accessToken)
			.accessTokenExpireTime(accessTokenExpireTime)
			.build();
	}
}
