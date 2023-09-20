package com.sss.tally.domain.travel.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;

public interface TravelRepository extends JpaRepository<Travel, Long> {

	@Query("SELECT t FROM Travel t WHERE t.travelId IN " +
		"(SELECT tg.travelId FROM TravelGroup tg WHERE tg.memberId = :memberId) " +
		"AND t.endDate < :now")
	List<Travel> findUpcomingTravelForMember(@Param("memberId") Member memberId, @Param("now") LocalDate now);


	@Query("SELECT t FROM Travel t WHERE t.travelId IN " +
		"(SELECT tg.travelId FROM TravelGroup tg WHERE tg.memberId = :memberId) " +
		"AND t.startDate <= :now AND t.endDate >= :now")
	List<Travel> findOngoingTravelForMember(@Param("memberId") Member memberId, @Param("now") LocalDate now);

	@Query("SELECT t FROM Travel t WHERE t.travelId IN " +
		"(SELECT tg.travelId FROM TravelGroup tg WHERE tg.memberId = :memberId) " +
		"AND t.startDate > :now")
	List<Travel> findPastTravelForMember(@Param("memberId") Member memberId, @Param("now") LocalDate now);
}
