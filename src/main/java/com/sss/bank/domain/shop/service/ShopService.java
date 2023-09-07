package com.sss.bank.domain.shop.service;

import com.sss.bank.api.shop.dto.ShopDto;

public interface ShopService {
	ShopDto.ShopRespDto createShop(ShopDto.ShopReqDto shopReqDto);

	ShopDto.ShopRespDto updateShop(ShopDto.ShopReqDto shopReqDto);

}
