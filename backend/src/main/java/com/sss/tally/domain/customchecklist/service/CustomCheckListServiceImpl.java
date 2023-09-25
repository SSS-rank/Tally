package com.sss.tally.domain.customchecklist.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.customchecklist.dto.CustomCheckListDto;
import com.sss.tally.domain.customchecklist.entity.CustomChecklist;
import com.sss.tally.domain.customchecklist.repository.CustomCheckListRepository;
import com.sss.tally.domain.defaultchecklist.entity.DefaultCheckList;
import com.sss.tally.domain.defaultchecklist.repository.DefaultCheckListRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.domain.travel.entity.Travel;
import com.sss.tally.domain.travel.repository.TravelRepository;
import com.sss.tally.domain.travelgroup.repository.TravelGroupRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.CalculateException;
import com.sss.tally.global.error.exception.CustomCheckListException;
import com.sss.tally.global.error.exception.MemberException;
import com.sss.tally.global.error.exception.TravelException;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@Transactional
public class CustomCheckListServiceImpl implements CustomCheckListService {

	private final DefaultCheckListRepository defaultCheckListRepository;

	private final CustomCheckListRepository customCheckListRepository;

	private final MemberRepository memberRepository;

	private final TravelRepository travelRepository;

	private final TravelGroupRepository travelGroupRepository;

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

	@Override
	public String addContent(String memberUuid, CustomCheckListDto.AddCustomCheckListReqDto addCustomCheckListReqDto) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		Member member = memberOptional.get();
		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(addCustomCheckListReqDto.getTravelId());
		if (travelOptional.isEmpty()) {
			throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);
		}
		Travel travel = travelOptional.get();

		boolean isMemberInTravel = travelGroupRepository.existsByTravelIdAndMemberId(travel, member);
		if (!isMemberInTravel) {
			throw new TravelException(ErrorCode.NOT_EXIST_MEMBER_TRAVEL);
		}
		customCheckListRepository.save(
			CustomChecklist.forSaveOf(member, travel, addCustomCheckListReqDto.getContent()));
		return "ok";
	}

	@Override
	public String updateContent(String memberUuid,
		CustomCheckListDto.UpdateCustomCheckListReqDto updateCustomCheckListReqDto) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		Optional<CustomChecklist> customChecklistOptional = customCheckListRepository.findCustomChecklistByCustomChecklistId(
			updateCustomCheckListReqDto.getCustomCheckListId());
		if (customChecklistOptional.isEmpty()) {
			throw new CustomCheckListException(ErrorCode.NOT_EXIST_CUSTOM_CHECKLIST);
		}
		CustomChecklist customChecklist = customChecklistOptional.get();
		Member member = memberOptional.get();
		if (!customChecklist.getMemberId().equals(member)) {
			throw new CustomCheckListException(ErrorCode.NOT_EQUAL_CHECKLIST_MEMBER);
		}
		customChecklist.UpdateContent(updateCustomCheckListReqDto.getContent());
		return "ok";
	}

	@Override
	public String deleteContent(String memberUuid, Long checkListId) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		Optional<CustomChecklist> customChecklistOptional = customCheckListRepository.findCustomChecklistByCustomChecklistId(
			checkListId);
		if (customChecklistOptional.isEmpty()) {
			throw new CustomCheckListException(ErrorCode.NOT_EXIST_CUSTOM_CHECKLIST);
		}
		CustomChecklist customChecklist = customChecklistOptional.get();
		Member member = memberOptional.get();
		if (!customChecklist.getMemberId().equals(member)) {
			throw new CustomCheckListException(ErrorCode.NOT_EQUAL_CHECKLIST_MEMBER);
		}
		customCheckListRepository.delete(customChecklist);
		return "ok";
	}

	@Override
	public List<CustomCheckListDto.GetCustomCheckListRespDto> getContent(String memberUuid, Long travelId) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberUuidAndWithdrawalDateIsNull(memberUuid);
		if (memberOptional.isEmpty()) {
			throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
		}
		Member member = memberOptional.get();
		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(travelId);
		if (travelOptional.isEmpty()) {
			throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);
		}
		Travel travel = travelOptional.get();
		boolean isMemberInTravel = travelGroupRepository.existsByTravelIdAndMemberId(travel, member);
		if (!isMemberInTravel) {
			throw new TravelException(ErrorCode.NOT_EXIST_MEMBER_TRAVEL);
		}
		List<CustomChecklist> customChecklists = customCheckListRepository.findCustomChecklistsByMemberIdAndTravelId(
			member, travel);
		List<CustomCheckListDto.GetCustomCheckListRespDto> customCheckListRespDto = new ArrayList<>();
		for (CustomChecklist customChecklist : customChecklists) {
			customCheckListRespDto.add(CustomCheckListDto.GetCustomCheckListRespDto.from(customChecklist));
		}
		if (customCheckListRespDto.isEmpty()) {
			return null;
		}
		return customCheckListRespDto;
	}

	@Override
	public String updateStatus(String memberUuid, Long checkListId) {
		return null;
	}
}
