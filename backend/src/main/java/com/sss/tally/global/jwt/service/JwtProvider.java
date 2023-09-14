package com.sss.tally.global.jwt.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.AuthenticationException;
import com.sss.tally.global.jwt.constant.GrantType;
import com.sss.tally.global.jwt.constant.TokenType;
import com.sss.tally.global.jwt.dto.JwtTokenDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtProvider {
	@Value("${token.access-token-expiration-time}")
	private String accessTokenExpirationTime;
	@Value("${token.refresh-token-expiration-time}")
	private String refreshTokenExpirationTime;
	@Value("${token.secret}")
	private String tokenSecret;

	//현재 시간으로부터 30분 뒤의 시간을 리턴
	public Date createAccessTokenExpireTime(){
		return new Date(System.currentTimeMillis()+Long.parseLong(accessTokenExpirationTime));
	}

	//현재 시간으로부터 2주 뒤의 시간을 리턴
	public Date createRefreshTokenExpireTime(){
		return new Date(System.currentTimeMillis()+Long.parseLong(refreshTokenExpirationTime));
	}
}
