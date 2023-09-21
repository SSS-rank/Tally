package com.sss.tally.domain.caculategroup.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.sss.tally.api.calculate.dto.CalculateDto;

@FeignClient(url = "http://j9a108.p.ssafy.io:8011", name = "calculateGroupClient")
public interface CalculateGroupClient {
	@PostMapping(value = "/transfer/deposit/tally", consumes = "application/json")
	CalculateDto.TransferDepositRespDto deposit(@RequestHeader("Content-type") String contentType,
		@RequestBody CalculateDto.TransferDepositReqDto transferDepositReqDto);
}
