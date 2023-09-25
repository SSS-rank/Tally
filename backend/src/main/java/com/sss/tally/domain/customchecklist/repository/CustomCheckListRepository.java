package com.sss.tally.domain.customchecklist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.customchecklist.entity.CustomChecklist;

public interface CustomCheckListRepository extends JpaRepository<CustomChecklist, Integer> {

	Optional<CustomChecklist> findCustomChecklistByCustomChecklistId(Long customCheckListId);
}
