package com.sss.tally.api.calculate.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@GetMapping("/request/{travelId}")
	public ResponseEntity<List<CalculateDto.GetRequestCalculateListRespDto>> getRequestCalculate(
		@AuthenticationPrincipal Member member, @PathVariable Long travelId) {
		String memberUuid = member.getMemberUuid();

		List<CalculateDto.GetRequestCalculateListRespDto> getRequestCalculateListRespDto
			= calculateGroupService.getRequestCalculate(memberUuid, travelId);
		return ResponseEntity.status(HttpStatus.OK).body(getRequestCalculateListRespDto);
	}

	@GetMapping("/request-detail/{calculateGroupUuid}")
	public ResponseEntity<CalculateDto.GetRequestCalculateDetailRespDto> getRequestCalculateDetail(
		@PathVariable String calculateGroupUuid,
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();

		CalculateDto.GetRequestCalculateDetailRespDto getRequestCalculateDetailRespDto
			= calculateGroupService.getRequestCalculateDetail(calculateGroupUuid, memberUuid);
		return ResponseEntity.status(HttpStatus.OK).body(getRequestCalculateDetailRespDto);
	}

	@GetMapping("/request-detail/{member_uuid}")
	public ResponseEntity<CalculateDto.GetRequestCalculateDetailRespDto> getRequestCalculateDetailbyMember(
		@RequestBody CalculateDto.GetRequestCalculateDetailReqDto getRequestCalculateDetailReqDto,
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();
		return null;
	}

	@GetMapping("/receive/{travelId}")
	public ResponseEntity<List<CalculateDto.GetResponseCalculateListRespDto>> getResponseCalculate(
		@AuthenticationPrincipal Member member, @PathVariable Long travelId) {
		String memberUuid = member.getMemberUuid();

		List<CalculateDto.GetResponseCalculateListRespDto> getResponseCalculateListRespDtoList
			= calculateGroupService.getResponseCalculate(memberUuid, travelId);
		return ResponseEntity.status(HttpStatus.OK).body(getResponseCalculateListRespDtoList);
	}

	@GetMapping("/receive-detail/{calculateGroupUuid}")
	public ResponseEntity<CalculateDto.GetResponseCalculateDetailRespDto> getResponseCalculateDetail(
		@PathVariable String calculateGroupUuid,
		@AuthenticationPrincipal Member member) {
		String memberUuid = member.getMemberUuid();

		CalculateDto.GetResponseCalculateDetailRespDto getResponseCalculateDetailRespDto
			= calculateGroupService.getResponseCalculateDetail(calculateGroupUuid, memberUuid);
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
