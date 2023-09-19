package com.sss.tally.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.sss.tally.domain.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findMemberByKakaoId(Long kakaoId);

	UserDetails findMemberByMemberUuid(String memberUuid);
	Optional<Member> findByMemberUuid(String memberUuid);
}
