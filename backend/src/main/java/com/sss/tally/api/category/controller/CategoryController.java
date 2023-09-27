package com.sss.tally.api.category.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.category.dto.CategoryDto;
import com.sss.tally.domain.category.service.CategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

	private final CategoryService categoryService;

	@GetMapping
	public ResponseEntity<List<CategoryDto>> getCategoryList(){
		List<CategoryDto> categoryList = categoryService.getCategoryList();
		return ResponseEntity.status(HttpStatus.OK).body(categoryList);
	}
}
