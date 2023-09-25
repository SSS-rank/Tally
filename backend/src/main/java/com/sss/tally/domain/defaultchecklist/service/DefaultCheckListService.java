package com.sss.tally.domain.defaultchecklist.service;

import com.sss.tally.api.defaultchecklist.dto.DefaultCheckListDto;
import com.sss.tally.domain.member.entity.Member;

public interface DefaultCheckListService {

	public void createInitCheckList(Member member);

	String addContent(String memberUuid, DefaultCheckListDto.AddDefaultCheckListReqDto addDefaultCheckListReqDto);

	String updateContent(String memberUuid,
		DefaultCheckListDto.UpdateDefaultCheckListReqDto updateDefaultCheckListReqDto);

	String deleteContent(String memberUuid, Long checkListId);
}
