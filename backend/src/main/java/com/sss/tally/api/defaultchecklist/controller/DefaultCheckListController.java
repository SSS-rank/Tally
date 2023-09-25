package com.sss.tally.api.defaultchecklist.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@PatchMapping
	public ResponseEntity<String> updateContent(
		@RequestBody DefaultCheckListDto.UpdateDefaultCheckListReqDto updateDefaultCheckListReqDto,
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();
		String result = defaultCheckListService.updateContent(memberUuid, updateDefaultCheckListReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@DeleteMapping("/{checkListId}")
	public ResponseEntity<String> deleteContent(
		@PathVariable Long checkListId,
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();
		String result = defaultCheckListService.deleteContent(memberUuid, checkListId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping
	public ResponseEntity<List<DefaultCheckListDto.GetDefaultCheckListRespDto>> getContent(
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();
		List<DefaultCheckListDto.GetDefaultCheckListRespDto> defaultCheckListRespDto = defaultCheckListService.getContent(
			memberUuid);
		return ResponseEntity.status(HttpStatus.OK).body(defaultCheckListRespDto);
	}

}
