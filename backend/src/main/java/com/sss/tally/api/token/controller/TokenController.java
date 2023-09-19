package com.sss.tally.api.token.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.token.dto.TokenDto;
import com.sss.tally.api.token.service.TokenService;
import com.sss.tally.global.util.AuthorizationHeaderUtills;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/access-token")
public class TokenController {
	private final TokenService tokenService;
	@PostMapping
	public ResponseEntity<TokenDto.TokenRespDto> createAccessToken(HttpServletRequest httpServletRequest){
		String authorizationHeader = httpServletRequest.getHeader("Authorization");
		AuthorizationHeaderUtills.validateAuthorization(authorizationHeader);

		String refreshToken = authorizationHeader.split(" ")[1];
		TokenDto.TokenRespDto tokenRespDto = tokenService.createAccessToken(refreshToken);

		return ResponseEntity.status(HttpStatus.OK).body(tokenRespDto);
	}
}
