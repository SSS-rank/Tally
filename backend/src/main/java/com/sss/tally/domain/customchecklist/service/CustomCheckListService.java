package com.sss.tally.domain.customchecklist.service;

import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;

public interface CustomCheckListService {

	public void createInitCustomCheckList(Member member, Travel travel);
}
