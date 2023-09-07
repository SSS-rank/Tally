package com.sss.bank.domain.shop.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.sss.bank.api.shop.dto.ShopDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Shop {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long shopId;

	@Column(nullable = false)
	private int shopType;

	@Column(nullable = false)
	private String shopName;

	public static Shop from(ShopDto.ShopReqDto shopReqDto) {
		return Shop.builder()
			.shopName(shopReqDto.getShopName())
			.shopType(shopReqDto.getShopType())
			.build();
	}

	public void updateInfo(int shopType, String shopName) {
		this.shopType = shopType;
		this.shopName = shopName;
	}
}
