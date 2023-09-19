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

	private final MemberRepository memberRepository;

	//현재 시간으로부터 30분 뒤의 시간을 리턴
	public Date createAccessTokenExpireTime(){
		return new Date(System.currentTimeMillis()+Long.parseLong(accessTokenExpirationTime));
	}

	//현재 시간으로부터 2주 뒤의 시간을 리턴
	public Date createRefreshTokenExpireTime(){
		return new Date(System.currentTimeMillis()+Long.parseLong(refreshTokenExpirationTime));
	}

	// AccessToken 생성
	public String createAccessToken(String memberUuid, Date expirationTime) {
		return Jwts.builder()
			.setSubject(TokenType.ACCESS.name())
			.setIssuedAt(new Date())
			.setExpiration(expirationTime)
			.claim("memberUuid", memberUuid)
			.signWith(SignatureAlgorithm.HS512, tokenSecret.getBytes(StandardCharsets.UTF_8))
			.setHeaderParam("typ","JWT")
			.compact();
	}

	// RefreshToken 생성
	public String createRefreshToken(String memberUuid, Date expirationTime){
		return Jwts.builder()
			.setSubject(TokenType.REFRESH.name())
			.setIssuedAt(new Date())
			.setExpiration(expirationTime)
			.claim("memberUuid", memberUuid)
			.signWith(SignatureAlgorithm.HS512, tokenSecret.getBytes(StandardCharsets.UTF_8))
			.compact();
	}

	// JwtToken 생성
	public JwtTokenDto createJwtTokenDto(String memberUuid){
		Date accessTokenExpireTime = createAccessTokenExpireTime();
		Date refreshTokenExpireTime = createRefreshTokenExpireTime();
		String accessToken = createAccessToken(memberUuid, accessTokenExpireTime);
		String refreshToken = createRefreshToken(memberUuid, refreshTokenExpireTime);

		return JwtTokenDto.builder()
			.grantType(GrantType.BEARER.getType())
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.accessTokenExpireTime(accessTokenExpireTime)
			.refreshTokenExpireTime(refreshTokenExpireTime)
			.build();
	}

	// 토큰 유효성 검사
	public boolean validateToken(String token){
		try{
			Jwts.parser().setSigningKey(tokenSecret.getBytes(StandardCharsets.UTF_8))
				.parseClaimsJws(token);
		} catch (ExpiredJwtException e) {
			throw new AuthenticationException(ErrorCode.EXPIRED_TOKEN);
		} catch (Exception e){
			throw new AuthenticationException(ErrorCode.NOT_VALID_TOKEN);
		}
		return true;
	}

	// 토큰 Claim 으로 가져오기
	public Claims getTokenClaims(String token) {
		Claims claims;
		try {
			claims = Jwts.parser().setSigningKey(tokenSecret.getBytes(StandardCharsets.UTF_8))
				.parseClaimsJws(token).getBody();
		} catch (Exception e) {
			throw new AuthenticationException(ErrorCode.NOT_VALID_TOKEN);
		}
		return claims;
	}

	// JWT 로 인증정보 조회
	public Authentication getAuthentication(String token){
		Claims claims = this.getTokenClaims(token);
		String memberUuid = (String)claims.get("memberUuid");
		UserDetails userDetails = memberRepository.findMemberByMemberUuid(memberUuid);
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}
}
