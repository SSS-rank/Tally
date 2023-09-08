package com.sss.bank.api.logout.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.logout.service.LogoutService;
import com.sss.bank.global.util.AuthorizationHeaderUtills;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class LogoutController {
	private final LogoutService logoutService;
	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpServletRequest httpServletRequest){
		String authorizationHeader = httpServletRequest.getHeader("Authorization");
		AuthorizationHeaderUtills.validateAuthorization(authorizationHeader);

		String accessToken = authorizationHeader.split(" ")[1];
		logoutService.logout(accessToken);

		return ResponseEntity.status(HttpStatus.OK).body("logout success");
	}
}
