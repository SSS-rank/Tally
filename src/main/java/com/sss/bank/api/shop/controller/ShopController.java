package com.sss.bank.api.shop.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.shop.dto.ShopDto;
import com.sss.bank.domain.shop.service.ShopService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/shop")
public class ShopController {
	private final ShopService shopService;

	@PostMapping
	public ResponseEntity<ShopDto.ShopRespDto> createShop(@RequestBody @Valid ShopDto.ShopReqDto shopReqDto) {
		ShopDto.ShopRespDto shopRespDto = shopService.createShop(shopReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(shopRespDto);
	}

	@PatchMapping
	public ResponseEntity<ShopDto.ShopRespDto> modifyShop(@RequestBody @Valid ShopDto shopDto) {
		ShopDto.ShopRespDto shopRespDto = shopService.updateShop(shopDto);
		return ResponseEntity.status(HttpStatus.OK).body(shopRespDto);
	}
}
