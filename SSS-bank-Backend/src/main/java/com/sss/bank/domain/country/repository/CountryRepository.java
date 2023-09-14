package com.sss.bank.domain.country.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.bank.domain.country.entity.Country;

public interface CountryRepository extends JpaRepository<Country, Long> {
	Optional<Country> findCountryByCountryCode(String countryCode);
}
