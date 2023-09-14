package com.sss.bank.api.logout.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.logout.service.LogoutService;
import com.sss.bank.global.util.AuthorizationHeaderUtills;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"04. logout"}, description = "로그아웃 관련 서비스")
@RestController
@RequiredArgsConstructor
public class LogoutController {
	private final LogoutService logoutService;

	@ApiOperation(value = "로그아웃", notes = "로그아웃한다.")
	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpServletRequest httpServletRequest) {
		String authorizationHeader = httpServletRequest.getHeader("Authorization");
		AuthorizationHeaderUtills.validateAuthorization(authorizationHeader);

		String accessToken = authorizationHeader.split(" ")[1];
		logoutService.logout(accessToken);

		return ResponseEntity.status(HttpStatus.OK).body("logout success");
	}
}
