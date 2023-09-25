package com.sss.tally.domain.defaultchecklist.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.domain.defaultchecklist.entity.DefaultCheckList;
import com.sss.tally.domain.defaultchecklist.repository.DefaultCheckListRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.MemberException;

import lombok.AllArgsConstructor;

@Transactional
@AllArgsConstructor
@Service
public class DefaultCheckListServiceImpl implements DefaultCheckListService {
	private final MemberRepository memberRepository;

	private final DefaultCheckListRepository defaultCheckListRepository;

	@Override
	public void createInitCheckList(Member member) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(member.getMemberId());
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);
		}
		List<DefaultCheckList> checkLists = Arrays.asList(
			DefaultCheckList.of(member, "여권"),
			DefaultCheckList.of(member, "충전기"),
			DefaultCheckList.of(member, "세면도구"),
			DefaultCheckList.of(member, "비상약"),
			DefaultCheckList.of(member, "지갑"),
			DefaultCheckList.of(member, "신분증"),
			DefaultCheckList.of(member, "여벌 옷")
		);

		defaultCheckListRepository.saveAll(checkLists);

	}
}
