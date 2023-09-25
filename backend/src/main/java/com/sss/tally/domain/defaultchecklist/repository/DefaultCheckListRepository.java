package com.sss.tally.domain.defaultchecklist.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.defaultchecklist.entity.DefaultCheckList;
import com.sss.tally.domain.member.entity.Member;

public interface DefaultCheckListRepository extends JpaRepository<DefaultCheckList, Integer> {
	List<DefaultCheckList> findDefaultCheckListByMemberId(Member member);

	Optional<DefaultCheckList> findDefaultCheckListByDefaultChecklistId(Long defaultCheckList);
}
