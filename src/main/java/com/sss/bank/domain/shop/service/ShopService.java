package com.sss.bank.domain.shop.service;

import java.util.List;

import com.sss.bank.api.shop.dto.ShopDto;

public interface ShopService {
	ShopDto.ShopRespDto createShop(ShopDto.ShopReqDto shopReqDto);

	ShopDto.ShopRespDto updateShop(ShopDto shopDto);

	List<ShopDto> getShopList();

}
