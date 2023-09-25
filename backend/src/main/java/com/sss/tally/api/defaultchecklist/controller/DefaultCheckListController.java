package com.sss.tally.api.defaultchecklist.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.defaultchecklist.dto.DefaultCheckListDto;
import com.sss.tally.domain.defaultchecklist.service.DefaultCheckListService;
import com.sss.tally.domain.member.entity.Member;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/default-checklist")
public class DefaultCheckListController {
	private final DefaultCheckListService defaultCheckListService;

	@PostMapping
	public ResponseEntity<String> addContent(
		@RequestBody DefaultCheckListDto.AddDefaultCheckListReqDto addDefaultCheckListReqDto,
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();
		String result = defaultCheckListService.addContent(memberUuid, addDefaultCheckListReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
}
