package com.sss.tally.api.calculate.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.calculate.dto.CalculateDto;
import com.sss.tally.domain.caculategroup.service.CalculateGroupService;
import com.sss.tally.domain.member.entity.Member;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/calculate")
public class CalculateController {

	private final CalculateGroupService calculateGroupService;

	@PostMapping
	public ResponseEntity<String> createCalculate(
		@RequestBody List<CalculateDto.CalculateCreateReqDto> calculateCreateDto,
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();
		String result = calculateGroupService.createCalculate(calculateCreateDto, memberUuid);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("/request")
	public ResponseEntity<List<CalculateDto.GetRequestCalculateListRespDto>> getRequestCalculate(
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();

		List<CalculateDto.GetRequestCalculateListRespDto> getRequestCalculateListRespDto
			= calculateGroupService.getRequestCalculate(memberUuid);
		return ResponseEntity.status(HttpStatus.OK).body(getRequestCalculateListRespDto);
	}

	@GetMapping("/receive")
	public ResponseEntity<List<CalculateDto.GetResponseCalculateListRespDto>> getResponseCalculate(
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();

		List<CalculateDto.GetResponseCalculateListRespDto> getResponseCalculateListRespDtoList
			= calculateGroupService.getResponseCalculate(memberUuid);
		return ResponseEntity.status(HttpStatus.OK).body(getResponseCalculateListRespDtoList);
	}

	@GetMapping("/receive-detail")
	public ResponseEntity<CalculateDto.GetResponseCalculateDetailRespDto> getResponseCalculateDetail(
		@RequestBody CalculateDto.GetResponseCalculateDetailReqDto getResponseCalculateDetailReqDto,
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();

		CalculateDto.GetResponseCalculateDetailRespDto getResponseCalculateDetailRespDto
			= calculateGroupService.getResponseCalculateDetail(getResponseCalculateDetailReqDto, memberUuid);
		return ResponseEntity.status(HttpStatus.OK).body(getResponseCalculateDetailRespDto);
	}

	@PatchMapping("/rejection")
	public ResponseEntity<String> rejectCalculate(
		@RequestBody CalculateDto.CalculateRejectReqDto calculateRejectReqDto,
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();
		String result = calculateGroupService.rejectCalculate(calculateRejectReqDto, memberUuid);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@PostMapping("/accept")
	public ResponseEntity<String> acceptCalculate(
		@RequestBody CalculateDto.CalculateAcceptReqDto calculateAcceptReqDto,
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();
		String result = calculateGroupService.acceptCalculate(calculateAcceptReqDto, memberUuid);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
}
