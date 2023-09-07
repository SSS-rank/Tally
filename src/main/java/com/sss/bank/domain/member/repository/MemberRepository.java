package com.sss.bank.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.bank.domain.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findMemberByKakaoId(Long id);
	Optional<Member> findMemberByMemberId(long memberId);
}
