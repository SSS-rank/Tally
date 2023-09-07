package com.sss.bank.api.login.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.login.dto.OauthLoginDto;
import com.sss.bank.api.login.service.OauthLoginService;
import com.sss.bank.global.util.AuthorizationHeaderUtills;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OauthLoginController {
	private final OauthLoginService oauthLoginService;

	@PostMapping("/login")
	public ResponseEntity<OauthLoginDto.Response> oauthLogin(HttpServletRequest httpServletRequest){
		String authorizationHeader = httpServletRequest.getHeader("Authorization");
		AuthorizationHeaderUtills.validateAuthorization(authorizationHeader);

		String accessToken = authorizationHeader.split(" ")[1];
		OauthLoginDto.Response jwtTokenResponseDto = oauthLoginService.oauthLogin(accessToken);
		return ResponseEntity.ok(jwtTokenResponseDto);
	}
}
