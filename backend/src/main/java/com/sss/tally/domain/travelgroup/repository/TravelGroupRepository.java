package com.sss.tally.domain.travelgroup.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;
import com.sss.tally.domain.travelgroup.entity.TravelGroup;

public interface TravelGroupRepository extends JpaRepository<TravelGroup, Long> {
	boolean existsByTravelIdAndMemberId(Travel travelId, Member memberId);
}
