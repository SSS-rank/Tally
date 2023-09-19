package com.sss.tally.domain.caculategroup.service;

import java.util.List;

import com.sss.tally.api.calculate.dto.CalculateDto;

public interface CalculateGroupService {
	String createCalculate(List<CalculateDto.CalculateCreateDto> calculateCreateDto);
}
