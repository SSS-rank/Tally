package com.sss.bank.api.login.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.login.dto.OauthLoginDto;
import com.sss.bank.api.login.service.OauthLoginService;
import com.sss.bank.global.util.AuthorizationHeaderUtills;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"03. login"}, description = "로그인 관련 서비스")
@RestController
@RequiredArgsConstructor
public class OauthLoginController {
	private final OauthLoginService oauthLoginService;

	@ApiOperation(value = "로그인", notes = "JWT를 발급받는다.")
	@PostMapping("/login")
	public ResponseEntity<OauthLoginDto.Response> oauthLogin(HttpServletRequest httpServletRequest) {
		String authorizationHeader = httpServletRequest.getHeader("Authorization");
		AuthorizationHeaderUtills.validateAuthorization(authorizationHeader);

		String accessToken = authorizationHeader.split(" ")[1];
		OauthLoginDto.Response jwtTokenResponseDto = oauthLoginService.oauthLogin(accessToken);

		return ResponseEntity.status(HttpStatus.OK).body(jwtTokenResponseDto);
	}
}
