package com.sss.tally.domain.caculategroup.service;

import java.util.List;

import com.sss.tally.api.calculate.dto.CalculateDto;

public interface CalculateGroupService {
	String createCalculate(List<CalculateDto.CalculateCreateReqDto> calculateCreateDto, String memberUuid);

	List<CalculateDto.GetRequestCalculateListRespDto> getRequestCalculate(String memberUuid ,CalculateDto.GetRequestCalculateListReqDto getRequestCalculateListReqDto);

	List<CalculateDto.GetResponseCalculateListRespDto> getResponseCalculate(String memberUuid, CalculateDto.GetRequestCalculateListReqDto getRequestCalculateListReqDto);

	String rejectCalculate(CalculateDto.CalculateRejectReqDto calculateRejectReqDto, String memberUuid);

	CalculateDto.GetResponseCalculateDetailRespDto getResponseCalculateDetail(
		CalculateDto.GetResponseCalculateDetailReqDto getResponseCalculateDetailReqDto, String memberUuid);

	String acceptCalculate(CalculateDto.CalculateAcceptReqDto calculateAcceptReqDto, String memberUuid);
}
