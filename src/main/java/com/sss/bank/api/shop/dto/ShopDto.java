package com.sss.bank.api.shop.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.bank.domain.shop.entity.Shop;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShopDto {
	private Long shopId;
	private int shopType;
	private String shopName;

	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class ShopReqDto {
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
