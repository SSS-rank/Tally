package com.sss.bank.domain.shop.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.sss.bank.api.shop.dto.ShopDto;
import com.sss.bank.domain.country.entity.Country;
import com.sss.bank.domain.member.entity.Member;

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

	@JoinColumn(name = "country_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Country countryId;

	@JoinColumn(name = "master")
	@ManyToOne(fetch = FetchType.LAZY)
	private Member master;

	public static Shop of(ShopDto.ShopReqDto shopReqDto, Country country, Member member) {
		return Shop.builder()
			.shopName(shopReqDto.getShopName())
			.shopType(shopReqDto.getShopType())
			.countryId(country)
			.master(member)
			.build();
	}

	public void updateInfo(int shopType, String shopName) {
		this.shopType = shopType;
		this.shopName = shopName;
	}
}
