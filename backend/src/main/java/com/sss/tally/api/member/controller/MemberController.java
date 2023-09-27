package com.sss.tally.api.member.controller;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sss.tally.api.member.dto.MemberDto;
import com.sss.tally.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
	private final MemberService memberService;

	@PatchMapping("/withdrawal")
	public ResponseEntity<String> withdrawal(Authentication authentication){
		memberService.withdrawal(authentication);
		return ResponseEntity.status(HttpStatus.OK).body("Withdrawal Success");
	}

	@GetMapping
	public ResponseEntity<MemberDto.MemberRespDto> getMemberInfo(Authentication authentication){
		MemberDto.MemberRespDto memberRespDto = memberService.getMemberInfo(authentication);
		return ResponseEntity.status(HttpStatus.OK).body(memberRespDto);
	}

	@PatchMapping("/profile")
	public ResponseEntity<MemberDto.MemberRespDto> patchMemberInfo(Authentication authentication,
		@RequestPart(value="key", required = true) MemberDto.MemberReqDto memberReqDto, @RequestPart(value="file", required = false)
		MultipartFile file) throws IOException {
		MemberDto.MemberRespDto memberRespDto = memberService.patchMemberInfo(authentication, memberReqDto.getNickname(), file);
		return ResponseEntity.status(HttpStatus.OK).body(memberRespDto);
	}

	@PatchMapping("/transfer-password")
	public ResponseEntity<String> patchPassword(Authentication authentication, @RequestBody
		MemberDto.MemberPasswordDto memberPasswordDto) throws NoSuchAlgorithmException {
		memberService.patchPassword(authentication, memberPasswordDto);
		return ResponseEntity.status(HttpStatus.OK).body("Update Password Success");
	}

	@GetMapping("/transfer-password")
	public ResponseEntity<Boolean> checkPassword(Authentication authentication, @RequestBody
	MemberDto.MemberPasswordDto memberPasswordDto) throws NoSuchAlgorithmException {
		Boolean check = memberService.checkPassword(authentication, memberPasswordDto);
		return ResponseEntity.status(HttpStatus.OK).body(check);
	}
}
