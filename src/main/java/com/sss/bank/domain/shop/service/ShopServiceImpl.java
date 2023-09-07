package com.sss.bank.domain.shop.service;

import org.springframework.stereotype.Service;

import com.sss.bank.api.shop.dto.ShopDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShopServiceImpl implements ShopService {
	@Override
	public ShopDto.ShopRespDto createShop(ShopDto.ShopReqDto shopReqDto) {
		return null;
	}
}
