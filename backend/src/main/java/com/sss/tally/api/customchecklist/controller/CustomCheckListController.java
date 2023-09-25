package com.sss.tally.api.customchecklist.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.customchecklist.dto.CustomCheckListDto;
import com.sss.tally.domain.customchecklist.service.CustomCheckListService;
import com.sss.tally.domain.member.entity.Member;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/custom-checklist")
public class CustomCheckListController {
	private final CustomCheckListService customCheckListService;

	@PostMapping
	public ResponseEntity<String> addContent(
		@RequestBody CustomCheckListDto.AddCustomCheckListReqDto addCustomCheckListReqDto,
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();
		String result = customCheckListService.addContent(memberUuid, addCustomCheckListReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@PatchMapping
	public ResponseEntity<String> updateContent(
		@RequestBody CustomCheckListDto.UpdateCustomCheckListReqDto updateDefaultCheckListReqDto,
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();
		String result = customCheckListService.updateContent(memberUuid, updateDefaultCheckListReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@DeleteMapping("/{checkListId}")
	public ResponseEntity<String> deleteContent(
		@PathVariable Long checkListId,
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();
		String result = customCheckListService.deleteContent(memberUuid, checkListId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
}
