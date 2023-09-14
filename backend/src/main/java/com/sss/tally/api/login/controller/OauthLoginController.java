package com.sss.tally.api.login.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.login.dto.OauthLoginDto;
import com.sss.tally.api.login.service.OauthLoginService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OauthLoginController {
	private final OauthLoginService oauthLoginService;
	@PostMapping("/login")
	public ResponseEntity<OauthLoginDto.OauthLoginRespDto> oauthLogin(@RequestBody OauthLoginDto.OauthLoginReqDto oauthLoginReqDto) {
		OauthLoginDto.OauthLoginRespDto jwtTokenResponseDto = oauthLoginService.oauthLogin(oauthLoginReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(jwtTokenResponseDto);
	}
}
