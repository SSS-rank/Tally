package com.sss.tally.api.category.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.domain.category.entity.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class CategoryDto {
	private Long categoryId;
	private String categoryType;

	public static CategoryDto from(Category category){
		return CategoryDto.builder()
			.categoryId(category.getCategoryId())
			.categoryType(category.getCategoryType())
			.build();
	}
}
