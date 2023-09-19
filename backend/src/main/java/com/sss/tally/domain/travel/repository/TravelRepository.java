package com.sss.tally.domain.travel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.travel.entity.Travel;

public interface TravelRepository extends JpaRepository<Travel, Long> {
}
