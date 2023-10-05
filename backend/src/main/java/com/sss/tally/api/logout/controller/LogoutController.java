package com.sss.tally.api.logout.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.logout.service.LogoutService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class LogoutController {
	private final LogoutService logoutService;
	@PostMapping("/logout")
	public ResponseEntity<String> logout() {
		logoutService.logout();
		return ResponseEntity.status(HttpStatus.OK).body("logout success");
	}
}
