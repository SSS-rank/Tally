package com.sss.bank.domain.shop.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.api.shop.dto.ShopDto;
import com.sss.bank.domain.shop.entity.Shop;
import com.sss.bank.domain.shop.repository.ShopRepository;
import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.ShopException;

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
	public ShopDto.ShopRespDto updateShop(ShopDto shopDto) {
		Optional<Shop> shop = shopRepository.findShopByShopId(shopDto.getShopId());
		if (shop.isEmpty())
			throw new ShopException(ErrorCode.NOT_EXIST_SHOP);
		shop.get().updateInfo(shopDto.getShopType(), shopDto.getShopName());
		return ShopDto.ShopRespDto.from(shop.get());
	}
}
