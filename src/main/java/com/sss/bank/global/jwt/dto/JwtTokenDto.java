package com.sss.bank.global.jwt.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtTokenDto {
	private String grantType;
	private String accessToken;
	private String refreshToken;
	private Date accessTokenExpireTime;
	private Date refreshTokenExpireTime;
}
