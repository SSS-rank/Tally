package com.sss.bank.api.token.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.token.dto.AccessTokenRespDto;
import com.sss.bank.api.token.service.TokenService;
import com.sss.bank.global.util.AuthorizationHeaderUtills;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"08. token"}, description = "토큰 관련 서비스")
@RestController
@RequiredArgsConstructor
public class TokenController {
	private final TokenService tokenService;

	@ApiOperation(value = "JWT재발급", notes = "RefreshToken으로 JWT를 재발급 받는다.")
	@PostMapping("/access-token/issue")
	public ResponseEntity<AccessTokenRespDto> createAccessToken(HttpServletRequest httpServletRequest) {
		String authorizationHeader = httpServletRequest.getHeader("Authorization");
		AuthorizationHeaderUtills.validateAuthorization(authorizationHeader);

		String refreshToken = authorizationHeader.split(" ")[1];
		AccessTokenRespDto accessTokenRespDto = tokenService.createAccessTokenByRefreshToken(refreshToken);

		return ResponseEntity.status(HttpStatus.OK).body(accessTokenRespDto);
	}
}
