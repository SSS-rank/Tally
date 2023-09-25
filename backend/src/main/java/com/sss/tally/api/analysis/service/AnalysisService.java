package com.sss.tally.api.analysis.service;

import org.springframework.security.core.Authentication;

import com.sss.tally.api.analysis.dto.AnalysisDto;

public interface AnalysisService {
	AnalysisDto.GroupMemberRespDto getGroupAnalysis(Authentication authentication, Long travelId);
}
