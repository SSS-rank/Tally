package com.sss.tally.api.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
	private final MemberService memberService;

	@PostMapping("/withdrawal")
	public ResponseEntity<String> withdrawal(Authentication authentication){
		memberService.withdrawal(authentication);
		return ResponseEntity.status(HttpStatus.OK).body("Withdrawal Success");
	}
}
