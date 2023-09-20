package com.sss.tally.domain.account.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.sss.tally.api.account.dto.AccountDto;

@FeignClient(url = "http://j9a108.p.ssafy.io:8011", name="accountInfoClient")
public interface AccountInfoClient {
	@PostMapping(value = "/account/get-balance/tally", consumes = "application/json")
	AccountDto.AccountInfoRespDto getAccountBalance(@RequestHeader("Content-type") String contentType,
		@RequestBody AccountDto.AccountInfoReqDto accountInfoReqDto);
}
