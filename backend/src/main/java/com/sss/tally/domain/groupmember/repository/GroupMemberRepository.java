package com.sss.tally.domain.groupmember.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.groupmember.entity.GroupMember;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Integer> {

}
