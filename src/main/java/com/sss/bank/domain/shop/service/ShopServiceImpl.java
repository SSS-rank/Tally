package com.sss.bank.domain.shop.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.api.shop.dto.ShopDto;
import com.sss.bank.domain.shop.entity.Shop;
import com.sss.bank.domain.shop.repository.ShopRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ShopServiceImpl implements ShopService {
	private final ShopRepository shopRepository;

	@Override
	public ShopDto.ShopRespDto createShop(ShopDto.ShopReqDto shopReqDto) {
		Shop shop = Shop.from(shopReqDto);
		shopRepository.save(shop);
		return ShopDto.ShopRespDto.from(shop);
	}

	@Override
	public ShopDto.ShopRespDto updateShop(ShopDto.ShopReqDto shopReqDto) {
		Shop shop = Shop.from(shopReqDto);
		shop.updateInfo(shopReqDto.getShopType(), shopReqDto.getShopName());
		return ShopDto.ShopRespDto.from(shop);
	}
}
