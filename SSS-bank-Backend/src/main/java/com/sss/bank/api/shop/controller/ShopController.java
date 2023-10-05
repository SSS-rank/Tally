package com.sss.bank.api.shop.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.bank.api.shop.dto.ShopDto;
import com.sss.bank.domain.shop.service.ShopService;
import com.sss.bank.global.resolver.MemberInfo;
import com.sss.bank.global.resolver.MemberInfoDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"07. shop"}, description = "상점 관련 서비스")
@RequiredArgsConstructor
@RestController
@RequestMapping("/shop")
public class ShopController {
	private final ShopService shopService;

	@ApiOperation(value = "상점 생성", notes = "상점을 생성한다")
	@PostMapping
	public ResponseEntity<ShopDto.ShopRespDto> createShop(@MemberInfo MemberInfoDto memberInfoDto, @RequestBody @Valid ShopDto.ShopReqDto shopReqDto) {
		ShopDto.ShopRespDto shopRespDto = shopService.createShop(shopReqDto, memberInfoDto);
		return ResponseEntity.status(HttpStatus.OK).body(shopRespDto);
	}

	@ApiOperation(value = "상점 수정", notes = "상점을 수정한다")
	@PatchMapping
	public ResponseEntity<ShopDto.ShopRespDto> modifyShop(@MemberInfo MemberInfoDto memberInfoDto, @RequestBody @Valid ShopDto shopDto) {
		ShopDto.ShopRespDto shopRespDto = shopService.updateShop(shopDto, memberInfoDto);
		return ResponseEntity.status(HttpStatus.OK).body(shopRespDto);
	}

	@ApiOperation(value = "상점리스트 조회", notes = "상점리스트를 조회한다")
	@GetMapping
	public ResponseEntity<List<ShopDto>> getShopList() {
		List<ShopDto> shopList = shopService.getShopList();
		return ResponseEntity.status(HttpStatus.OK).body(shopList);
	}
}
