package com.sss.bank.api.shop.dto;

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
	public static class ShopReqDto {
		private int shopType;
		private String shopName;
	}

}
