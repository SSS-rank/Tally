package com.sss.tally.domain.travel.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;

public interface TravelRepository extends JpaRepository<Travel, Long> {

	@Query("SELECT t FROM Travel t WHERE t.travelId IN " +
		"(SELECT tg.travelId FROM TravelGroup tg WHERE tg.memberId = :memberId And tg.visible = true) " +
		"AND t.endDate < :now")
	List<Travel> findUpcomingTravelForMember(@Param("memberId") Member memberId, @Param("now") LocalDate now, Pageable pageable);


	@Query("SELECT t FROM Travel t WHERE t.travelId IN " +
		"(SELECT tg.travelId FROM TravelGroup tg WHERE tg.memberId = :memberId And tg.visible = true) " +
		"AND t.startDate <= :now AND t.endDate >= :now")
	List<Travel> findOngoingTravelForMember(@Param("memberId") Member memberId, @Param("now") LocalDate now, Pageable pageable);

	@Query("SELECT t FROM Travel t WHERE t.travelId IN " +
		"(SELECT tg.travelId FROM TravelGroup tg WHERE tg.memberId = :memberId And tg.visible = true) " +
		"AND t.startDate > :now")
	List<Travel> findPastTravelForMember(@Param("memberId") Member memberId, @Param("now") LocalDate now, Pageable pageable);
	@Query("SELECT t FROM Travel t WHERE t.travelId IN " +
		"(SELECT tg.travelId FROM TravelGroup tg WHERE tg.memberId = :memberId And tg.visible = false) ")
	List<Travel> findInvisibleTravelForMember(@Param("memberId") Member memberId);

	Optional<Travel> findTravelByTravelId(Long travelId);

	@Query("SELECT t FROM Travel t WHERE t.travelId IN " +
		"(SELECT tg.travelId FROM TravelGroup tg WHERE tg.memberId = :memberId) " +
		"AND t.startDate > :now ORDER BY t.startDate ASC")
	List<Travel> findUpcomingTravelForMemberOrderByTravelDate(@Param("memberId") Member memberId, @Param("now") LocalDate now);

	@Query("SELECT t FROM Travel t WHERE t.travelId IN " +
			"(SELECT tg.travelId FROM TravelGroup tg WHERE tg.memberId = :memberId And tg.visible = true) " +
			"AND t.startDate <= :now AND t.endDate >= :now ORDER BY t.startDate ASC")
	List<Travel> findOngoingTravelForMemberOrderByTravelDate(@Param("memberId") Member memberId, @Param("now") LocalDate now);

	@Query("SELECT t " +
			"FROM Travel t " +
			"WHERE t.travelId IN (SELECT MIN(tg.travelId.travelId) " +
			"FROM TravelGroup tg " +
			"WHERE tg.memberId = :memberId " +
			"AND tg.travelId.startDate <= :now " +
			"GROUP BY tg.travelId.travelLocation, tg.travelId.travelType)")
	List<Travel> findTravelWithUniqueLocationAndType(Member memberId, LocalDate now);
}
