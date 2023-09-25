package com.sss.tally.api.analysis.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.analysis.dto.AnalysisDto;
import com.sss.tally.api.analysis.service.AnalysisService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/analysis")
public class AnalysisController {
	private final AnalysisService analysisService;

	@GetMapping("/{travelId}")
	public ResponseEntity<AnalysisDto.GroupMemberRespDto> getGroupAnalysis(
		Authentication authentication, @PathVariable Long travelId
	){
		AnalysisDto.GroupMemberRespDto groupMemberRespDtoList = analysisService.getGroupAnalysis(authentication, travelId);
		return ResponseEntity.status(HttpStatus.OK).body(groupMemberRespDtoList);
	}

	@GetMapping("/{travelId}/{memberUuid}")
	public ResponseEntity<AnalysisDto.MemberRespDto> getMemberAnalysis(
		Authentication authentication, @PathVariable Long travelId, @PathVariable String memberUuid
	){
		AnalysisDto.MemberRespDto memberRespDtoList = analysisService.getMemberAnalysis(authentication, travelId, memberUuid);
		return ResponseEntity.status(HttpStatus.OK).body(memberRespDtoList);
	}
}
