package com.sss.tally.domain.customchecklist.service;

import java.util.List;

import com.sss.tally.api.customchecklist.dto.CustomCheckListDto;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;

public interface CustomCheckListService {

	public void createInitCustomCheckList(Member member, Travel travel);

	String addContent(String memberUuid, CustomCheckListDto.AddCustomCheckListReqDto addCustomCheckListReqDto);

	String updateContent(String memberUuid, CustomCheckListDto.UpdateCustomCheckListReqDto updateCustomCheckListReqDto);

	String deleteContent(String memberUuid, Long checkListId);

	List<CustomCheckListDto.GetCustomCheckListRespDto> getContent(String memberUuid, Long travelId);

	String updateStatus(String memberUuid, Long checkListId);
}
