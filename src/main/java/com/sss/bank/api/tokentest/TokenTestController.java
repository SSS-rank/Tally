package com.sss.bank.api.tokentest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.global.jwt.dto.JwtTokenDto;
import com.sss.bank.global.jwt.service.TokenManager;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/token-test")
public class TokenTestController {
	private final TokenManager tokenManager;

	@GetMapping("/create")
	public JwtTokenDto createJwtTokenDto(){
		return tokenManager.createJwtTokenDto(1L);
	}

	@GetMapping("/valid")
	public String validateJwtToken(@RequestParam String token){
		tokenManager.validateToken(token);
		Claims tokenClaims = tokenManager.getTokenClaims(token);
		long memberId = Long.valueOf((Integer) tokenClaims.get("memberId"));
		log.info("memberId: {}",memberId);
		return "success";
	}
}
