package com.sss.tally.domain.caculategroup.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.caculategroup.entity.CalculateGroup;
import com.sss.tally.domain.member.entity.Member;

public interface CalculateGroupRepository extends JpaRepository<CalculateGroup, Integer> {
	List<CalculateGroup> findCalculateGroupsByMemberId(Member member);

	Optional<CalculateGroup> findCalculateGroupByCalculateGroupUuid(String uuid);
}
