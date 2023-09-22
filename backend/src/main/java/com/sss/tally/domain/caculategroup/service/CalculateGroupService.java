package com.sss.tally.domain.caculategroup.service;

import java.util.List;

import com.sss.tally.api.calculate.dto.CalculateDto;

public interface CalculateGroupService {
	String createCalculate(List<CalculateDto.CalculateCreateReqDto> calculateCreateDto, String memberUuid);

	List<CalculateDto.GetRequestCalculateListRespDto> getRequestCalculate(String memberUuid, Long travelId);

	List<CalculateDto.GetResponseCalculateListRespDto> getResponseCalculate(String memberUuid, Long travelId);

	String rejectCalculate(CalculateDto.CalculateRejectReqDto calculateRejectReqDto, String memberUuid);

	CalculateDto.GetResponseCalculateDetailRespDto getResponseCalculateDetail(
		String calculateGroupUuid, String memberUuid);

	String acceptCalculate(CalculateDto.CalculateAcceptReqDto calculateAcceptReqDto, String memberUuid);

	CalculateDto.GetRequestCalculateDetailRespDto getRequestCalculateDetail(
		String calculateGroupUuid, String memberUuid);
}
