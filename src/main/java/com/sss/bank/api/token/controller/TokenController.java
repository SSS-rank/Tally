package com.sss.bank.api.token.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.token.dto.AccessTokenRespDto;
import com.sss.bank.api.token.service.TokenService;
import com.sss.bank.global.util.AuthorizationHeaderUtills;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TokenController {
	private final TokenService tokenService;

	@PostMapping("/access-token/issue")
	public ResponseEntity<AccessTokenRespDto> createAccessToken(HttpServletRequest httpServletRequest){
		String authorizationHeader = httpServletRequest.getHeader("Authorization");
		AuthorizationHeaderUtills.validateAuthorization(authorizationHeader);

		String refreshToken = authorizationHeader.split(" ")[1];
		AccessTokenRespDto accessTokenRespDto = tokenService.createAccessTokenByRefreshToken(refreshToken);

		return ResponseEntity.status(HttpStatus.OK).body(accessTokenRespDto);
	}
}
