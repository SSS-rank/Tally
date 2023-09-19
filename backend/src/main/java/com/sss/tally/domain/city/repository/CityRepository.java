package com.sss.tally.domain.city.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.city.entity.City;

public interface CityRepository extends JpaRepository<City, Long> {
	List<City> findBystateId_StateId(Long stateId);
}
