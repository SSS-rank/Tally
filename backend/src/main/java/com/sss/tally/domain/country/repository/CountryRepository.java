package com.sss.tally.domain.country.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.country.entity.Country;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
