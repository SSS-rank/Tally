package com.sss.tally.domain.customchecklist.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.customchecklist.entity.CustomChecklist;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;

public interface CustomCheckListRepository extends JpaRepository<CustomChecklist, Integer> {

	Optional<CustomChecklist> findCustomChecklistByCustomChecklistId(Long customCheckListId);

	List<CustomChecklist> findCustomChecklistsByMemberIdAndTravelId(Member member, Travel travel);
}
