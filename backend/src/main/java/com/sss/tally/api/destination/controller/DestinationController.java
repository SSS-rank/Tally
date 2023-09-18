package com.sss.tally.api.destination.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.destination.client.StatusClient;
import com.sss.tally.api.destination.dto.DestinationDto;
import com.sss.tally.api.destination.service.DestinationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/destination")
public class DestinationController {
	private final DestinationService destinationService;
	private final StatusClient statusClient;

	@PostMapping("/status")
	public ResponseEntity<List<DestinationDto.StatusCityRespDto>> getStatusList(){
		String contentType = "application/json";
		String statusCode = "*00000000";
		DestinationDto.StatusCityReqDto statusCityReqDto = DestinationDto.StatusCityReqDto.from(statusCode);
		DestinationDto.StatusRespListDto statusRespDtoList = statusClient.requestStatusInfo(contentType, statusCityReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(statusRespDtoList.getRegcodes());
	}

	@PostMapping("/city/{code}")
	public ResponseEntity<List<DestinationDto.StatusCityRespDto>> getCityList(@PathVariable String code){
		String contentType = "application/json";
		DestinationDto.StatusCityReqDto statusCityReqDto = DestinationDto.StatusCityReqDto.from(code);
		DestinationDto.StatusRespListDto statusRespDtoList = statusClient.requestStatusInfo(contentType, statusCityReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(statusRespDtoList.getRegcodes());
	}
}
