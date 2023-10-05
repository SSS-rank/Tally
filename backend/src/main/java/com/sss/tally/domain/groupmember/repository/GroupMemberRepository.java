package com.sss.tally.domain.groupmember.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.caculategroup.entity.CalculateGroup;
import com.sss.tally.domain.groupmember.entity.GroupMember;
import com.sss.tally.domain.member.entity.Member;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Integer> {
	List<GroupMember> findGroupMembersByMemberId(Member member);

	List<GroupMember> findGroupMembersByCalculateGroupId(CalculateGroup calculateGroup);

	Optional<GroupMember> findGroupMemberByCalculateGroupIdAndMemberId(CalculateGroup calculateGroup, Member member);
}
