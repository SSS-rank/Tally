package com.sss.tally.api.papago.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import com.sss.tally.api.papago.dto.PapagoDto;

@FeignClient(url = "https://openapi.naver.com", name="papagoClient")
public interface PapagoClient {
	@PostMapping(value = "/v1/papago/n2mt", consumes = "application/x-www-form-urlencoded; charset=utf-8")
	PapagoDto.TransferRespDto getTransfer(@RequestHeader("Content-type") String contentType,
		@RequestHeader("X-Naver-Client-Id") String clientId, @RequestHeader("X-Naver-Client-Secret") String clientSecret,
		@RequestParam("source") String start, @RequestParam("target") String end, @RequestParam("text") String text);
}
