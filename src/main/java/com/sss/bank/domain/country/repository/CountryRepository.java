package com.sss.bank.domain.country.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.bank.domain.country.entity.Country;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
