package com.sss.bank.global.jwt.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.AuthenticationException;
import com.sss.bank.global.jwt.constant.GrantType;
import com.sss.bank.global.jwt.constant.TokenType;
import com.sss.bank.global.jwt.dto.JwtTokenDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class TokenManager {
	private final String accesTokenExpirationTime;
	private final String refreshTokenExpirationTime;
	private final String tokenSecret;

	//현재 시간으로부터 10분 뒤의 시간을 리턴
	public Date createAcessTokenExpireTime(){
		return new Date(System.currentTimeMillis()+Long.parseLong(accesTokenExpirationTime));
	}

	//현재 시간으로부터 2주 뒤의 시간을 리턴
	public Date createRefreshTokenExpireTime(){
		return new Date(System.currentTimeMillis()+Long.parseLong(refreshTokenExpirationTime));
	}

	public String createAcessToken(Long memberId, Date expirationTime) {
		String accessToken = Jwts.builder()
			.setSubject(TokenType.ACCESS.name())
			.setIssuedAt(new Date())
			.setExpiration(expirationTime)
			.claim("memberId", memberId)
			.signWith(SignatureAlgorithm.HS512, tokenSecret.getBytes(StandardCharsets.UTF_8))
			.setHeaderParam("typ","JWT")
			.compact();

		return accessToken;
	}

	public String createRefreshToken(Long memberId, Date expirationTime){
		String refreshToken = Jwts.builder()
			.setSubject(TokenType.REFRESH.name())
			.setIssuedAt(new Date())
			.setExpiration(expirationTime)
			.claim("memberId", memberId)
			.signWith(SignatureAlgorithm.HS512, tokenSecret.getBytes(StandardCharsets.UTF_8))
			.compact();

		return refreshToken;
	}

	public JwtTokenDto createJwtTokenDto(Long memberId){
		Date accessTokenExpireTime = createAcessTokenExpireTime();
		Date refreshTokenExpireTime = createRefreshTokenExpireTime();
		String accessToken = createAcessToken(memberId, accessTokenExpireTime);
		String refrestToken = createRefreshToken(memberId, refreshTokenExpireTime);

		return JwtTokenDto.builder()
			.grantType(GrantType.BEARER.getType())
			.accessToken(accessToken)
			.refreshToken(refrestToken)
			.accessTokenExpireTime(accessTokenExpireTime)
			.refreshTokenExpireTime(refreshTokenExpireTime)
			.build();
	}

	public void validateToken(String token){
		try{
			Jwts.parser().setSigningKey(tokenSecret.getBytes(StandardCharsets.UTF_8))
				.parseClaimsJws(token);
		} catch (ExpiredJwtException e) {
			log.info("token 만료", e);
			throw new AuthenticationException(ErrorCode.TOKEN_EXPIRED);
		} catch (Exception e){
			log.info("유효하지 않은 token", e);
			throw new AuthenticationException(ErrorCode.NOT_VALID_TOKEN);
		}
	}

	public Claims getTokenClaims(String token) {
		Claims claims;
		try {
			claims = Jwts.parser().setSigningKey(tokenSecret.getBytes(StandardCharsets.UTF_8))
				.parseClaimsJws(token).getBody();
		} catch (Exception e) {
			log.info("유효하지 않은 token", e);
			throw new AuthenticationException(ErrorCode.NOT_VALID_TOKEN);
		}

		return claims;
	}
}
