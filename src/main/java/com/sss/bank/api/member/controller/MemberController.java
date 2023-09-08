package com.sss.bank.api.member.controller;

import java.time.LocalDateTime;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.member.dto.MemberDto;
import com.sss.bank.domain.member.service.MemberService;
import com.sss.bank.global.resolver.MemberInfo;
import com.sss.bank.global.resolver.MemberInfoDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
	private final MemberService memberService;

	@PatchMapping("/withdrawal")
	public ResponseEntity<LocalDateTime> withdrawal(@MemberInfo MemberInfoDto memberInfoDto) {
		LocalDateTime withdrawalDate = memberService.withdrawal(memberInfoDto.getMemberId());
		return ResponseEntity.status(HttpStatus.OK).body(withdrawalDate);
	}
}
