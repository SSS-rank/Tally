package com.sss.tally.domain.category.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.category.dto.CategoryDto;
import com.sss.tally.domain.category.entity.Category;
import com.sss.tally.domain.category.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
	private final CategoryRepository categoryRepository;
	@Override
	public List<CategoryDto> getCategoryList() {
		List<Category> all = categoryRepository.findAll();
		return all.stream()
			.map(CategoryDto::from)
			.collect(Collectors.toList());
	}
}
