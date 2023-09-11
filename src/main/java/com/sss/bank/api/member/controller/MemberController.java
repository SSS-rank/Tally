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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"05. member"}, description = "회원 관련 서비스")
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
	private final MemberService memberService;

	@ApiOperation(value = "회원 탈퇴", notes = "회원을 탈퇴한다.")
	@PatchMapping("/withdrawal")
	public ResponseEntity<LocalDateTime> withdrawal(@MemberInfo MemberInfoDto memberInfoDto) {
		LocalDateTime withdrawalDate = memberService.withdrawal(memberInfoDto.getMemberId());
		return ResponseEntity.status(HttpStatus.OK).body(withdrawalDate);
	}

	@ApiOperation(value = "회원정보 수정", notes = "회원 정보를 수정한다.")
	@PatchMapping("/info")
	public ResponseEntity<MemberDto.MemberRespDto> addInfo(@MemberInfo MemberInfoDto memberInfoDto,
		@RequestBody @Valid MemberDto.MemberReqDto memberReqDto) {
		MemberDto.MemberRespDto memberRespDto = memberService.addInfo(memberInfoDto.getMemberId(), memberReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(memberRespDto);
	}
}
