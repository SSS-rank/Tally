package com.sss.tally.domain.defaultchecklist.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.defaultchecklist.dto.DefaultCheckListDto;
import com.sss.tally.domain.defaultchecklist.entity.DefaultCheckList;
import com.sss.tally.domain.defaultchecklist.repository.DefaultCheckListRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.DefaultCheckListException;
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

	@Override
	public String addContent(String memberUuid,
		DefaultCheckListDto.AddDefaultCheckListReqDto addDefaultCheckListReqDto) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		Member member = memberOptional.get();
		defaultCheckListRepository.save(DefaultCheckList.of(member, addDefaultCheckListReqDto.getContent()));
		return "ok";
	}

	@Override
	public String updateContent(String memberUuid,
		DefaultCheckListDto.UpdateDefaultCheckListReqDto updateDefaultCheckListReqDto) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}

		Optional<DefaultCheckList> defaultCheckListOptional = defaultCheckListRepository.findDefaultCheckListByDefaultChecklistId(
			updateDefaultCheckListReqDto.getDefaultCheckListId());
		if (defaultCheckListOptional.isEmpty()) {
			throw new DefaultCheckListException(ErrorCode.NOT_EXIST_DEFAULT_CHECKLIST);
		}
		DefaultCheckList defaultCheckList = defaultCheckListOptional.get();
		Member member = memberOptional.get();
		if (!defaultCheckList.getMemberId().equals(member)) {
			throw new DefaultCheckListException(ErrorCode.NOT_EQUAL_CHECKLIST_MEMBER);
		}
		defaultCheckList.updateContent(updateDefaultCheckListReqDto.getContent());
		return "ok";
	}

	@Override
	public String deleteContent(String memberUuid, Long checkListId) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}

		Optional<DefaultCheckList> defaultCheckListOptional = defaultCheckListRepository.findDefaultCheckListByDefaultChecklistId(
			checkListId);
		if (defaultCheckListOptional.isEmpty()) {
			throw new DefaultCheckListException(ErrorCode.NOT_EXIST_DEFAULT_CHECKLIST);
		}
		DefaultCheckList defaultCheckList = defaultCheckListOptional.get();
		Member member = memberOptional.get();
		if (!defaultCheckList.getMemberId().equals(member)) {
			throw new DefaultCheckListException(ErrorCode.NOT_EQUAL_CHECKLIST_MEMBER);
		}
		defaultCheckListRepository.delete(defaultCheckList);
		return "ok";
	}

	@Override
	public List<DefaultCheckListDto.GetDefaultCheckListRespDto> getContent(String memberUuid) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		Member member = memberOptional.get();
		List<DefaultCheckList> defaultCheckListList = defaultCheckListRepository.findDefaultCheckListByMemberId(member);
		List<DefaultCheckListDto.GetDefaultCheckListRespDto> defaultCheckListResp = new ArrayList<>();
		for (DefaultCheckList defaultCheckList : defaultCheckListList) {
			defaultCheckListResp.add(DefaultCheckListDto.GetDefaultCheckListRespDto.from(defaultCheckList));
		}
		if (defaultCheckListResp.isEmpty()) {
			return null;
		}
		return defaultCheckListResp;
	}
}
