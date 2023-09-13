package com.sss.tally.api.login.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.login.dto.OauthLoginDto;
import com.sss.tally.api.login.service.OauthLoginService;
import com.sss.tally.global.util.AuthorizationHeaderUtills;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OauthLoginController {
	private final OauthLoginService oauthLoginService;
	@PostMapping("/login")
	public ResponseEntity<?> oauthLogin(HttpServletRequest httpServletRequest) {
		String authorizationHeader = httpServletRequest.getHeader("Authorization");
		AuthorizationHeaderUtills.validateAuthorization(authorizationHeader);

		String accessToken = authorizationHeader.split(" ")[1];
		OauthLoginDto.OauthLoginRespDto jwtTokenResponseDto = oauthLoginService.oauthLogin(accessToken);

		return ResponseEntity.status(HttpStatus.OK).body(jwtTokenResponseDto);
	}
}
