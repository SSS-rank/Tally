package com.sss.tally.domain.state.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.state.entity.State;

public interface StateRepository extends JpaRepository<State, Long> {
	Optional<State> findStateByStateName(String stateName);
	List<State> findAllByOrderByStateIdAsc();
}
