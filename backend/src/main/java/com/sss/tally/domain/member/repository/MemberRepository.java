package com.sss.tally.domain.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;


public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findMemberByKakaoId(Long kakaoId);

	UserDetails findMemberByMemberUuid(String memberUuid);
	Optional<Member> findByMemberUuid(String memberUuid);

	@Query("SELECT m FROM Member m WHERE m.memberId IN "
		+ "(SELECT tg.memberId FROM TravelGroup tg WHERE tg.travelId = :travelId)")
	List<Member> findMembersInTravel(Travel travelId);
}
