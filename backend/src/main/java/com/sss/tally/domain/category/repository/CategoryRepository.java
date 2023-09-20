package com.sss.tally.domain.category.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.category.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	Optional<Category> findCategoryByCategoryId(Long categoryId);
}
