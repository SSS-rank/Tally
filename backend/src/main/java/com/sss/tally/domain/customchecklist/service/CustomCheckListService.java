package com.sss.tally.domain.customchecklist.service;

import com.sss.tally.api.customchecklist.dto.CustomCheckListDto;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;

public interface CustomCheckListService {

	public void createInitCustomCheckList(Member member, Travel travel);

	String addContent(String memberUuid, CustomCheckListDto.AddCustomCheckListReqDto addCustomCheckListReqDto);
}
