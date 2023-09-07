package com.sss.bank.api.shop.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.bank.domain.shop.entity.Shop;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ShopDto {
	private Long shopId;

	@NotNull
	@Max(7)
	@Min(1)
	private int shopType;
	private String shopName;

	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class ShopReqDto {
		@NotNull
		@Max(7)
		@Min(1)
		private int shopType;
		private String shopName;
	}

	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class ShopRespDto {
		private int shopType;
		private String shopName;

		public static ShopRespDto from(Shop shop) {
			return ShopRespDto.builder()
				.shopName(shop.getShopName())
				.shopType(shop.getShopType())
				.build();
		}
	}
}
