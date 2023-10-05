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
	private String shopNationCode;
	private Long master;
	public static ShopDto from(Shop shop) {
		return ShopDto.builder()
			.shopId(shop.getShopId())
			.shopType(shop.getShopType())
			.shopName(shop.getShopName())
			.shopNationCode(shop.getCountryId().getCountryCode())
			.master(shop.getMaster().getMemberId())
			.build();
	}

	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class ShopReqDto {
		@NotNull
		@Max(7)
		@Min(1)
		private int shopType;
		private String shopName;
		private String shopNationCode;
	}

	@Getter
	@Builder
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class ShopRespDto {
		private int shopType;
		private String shopName;
		private String shopNationCode;

		public static ShopRespDto from(Shop shop) {
			return ShopRespDto.builder()
				.shopName(shop.getShopName())
				.shopType(shop.getShopType())
				.shopNationCode(shop.getCountryId().getCountryCode())
				.build();
		}
	}
}
