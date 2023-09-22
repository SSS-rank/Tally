package com.sss.tally.domain.customchecklist.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.domain.customchecklist.entity.CustomChecklist;
import com.sss.tally.domain.customchecklist.repository.CustomCheckListRepository;
import com.sss.tally.domain.defaultchecklist.entity.DefaultCheckList;
import com.sss.tally.domain.defaultchecklist.repository.DefaultCheckListRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.CalculateException;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@Transactional
public class CustomCheckListServiceImpl implements CustomCheckListService {

	private final DefaultCheckListRepository defaultCheckListRepository;

	private final CustomCheckListRepository customCheckListRepository;

	@Override
	public void createInitCustomCheckList(Member member, Travel travel) {
		List<DefaultCheckList> defaultCheckListList = defaultCheckListRepository.findDefaultCheckListByMemberId(
			member);
		if (defaultCheckListList.isEmpty()) {
			throw new CalculateException(ErrorCode.NOT_EXIST_DEFAULT_CHECKLIST);
		}
		for (DefaultCheckList defaultCheckList : defaultCheckListList) {
			customCheckListRepository.save(CustomChecklist.of(defaultCheckList, travel));
		}

	}
}
