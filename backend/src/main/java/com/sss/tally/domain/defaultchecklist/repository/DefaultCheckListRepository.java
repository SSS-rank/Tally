package com.sss.tally.domain.defaultchecklist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.defaultchecklist.entity.DefaultCheckList;

public interface DefaultCheckListRepository extends JpaRepository<DefaultCheckList, Integer> {

}
