package com.sss.bank.domain.shop.service;

import java.util.List;

import com.sss.bank.api.shop.dto.ShopDto;
import com.sss.bank.global.resolver.MemberInfoDto;

public interface ShopService {
	ShopDto.ShopRespDto createShop(ShopDto.ShopReqDto shopReqDto, MemberInfoDto memberInfoDto);

	ShopDto.ShopRespDto updateShop(ShopDto shopDto, MemberInfoDto memberInfoDto);

	List<ShopDto> getShopList();

}
