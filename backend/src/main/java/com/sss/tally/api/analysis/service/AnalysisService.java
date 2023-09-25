package com.sss.tally.api.analysis.service;

import java.util.List;

import org.springframework.security.core.Authentication;

import com.sss.tally.api.analysis.dto.AnalysisDto;

public interface AnalysisService {
	AnalysisDto.GroupMemberRespDto getGroupAnalysis(Authentication authentication, Long travelId);

	AnalysisDto.MemberRespDto getMemberAnalysis(Authentication authentication, Long travelId, String memberUuid);

	List<AnalysisDto.CategoryRespDto> getCategoryDetail(Authentication authentication, Long travelId, String memberUuid, Long categoryId);
}
