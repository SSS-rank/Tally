package com.sss.tally.domain.caculategroup.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.caculategroup.entity.CalculateGroup;
import com.sss.tally.domain.member.entity.Member;

public interface CalculateGroupRepository extends JpaRepository<CalculateGroup, Integer> {
	List<CalculateGroup> findCalculateGroupsByMemberId(Member member);

	CalculateGroup findCalculateGroupByCalculateGroupUuid(String uuid);
}
