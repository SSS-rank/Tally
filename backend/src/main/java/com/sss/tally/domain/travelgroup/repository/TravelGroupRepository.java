package com.sss.tally.domain.travelgroup.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;
import com.sss.tally.domain.travelgroup.entity.TravelGroup;

public interface TravelGroupRepository extends JpaRepository<TravelGroup, Long> {
	boolean existsByTravelIdAndMemberId(Travel travelId, Member memberId);

	@Query("SELECT tg.memberId.memberId FROM TravelGroup tg WHERE tg.travelId.travelId = :travelId")
	List<Long> findMemberIdsByTravelId(Long travelId);
}
