package com.sss.tally.domain.caculategroup.service;

import java.util.List;

import com.sss.tally.api.calculate.dto.CalculateDto;

public interface CalculateGroupService {
	String createCalculate(List<CalculateDto.CalculateCreateReqDto> calculateCreateDto, String memberUuid);

	List<CalculateDto.GetRequestCalculateListRespDto> getRequestCalculate(String memberUuid);

	List<CalculateDto.GetResponseCalculateListRespDto> getResponseCalculate(String memberUuid);
}
