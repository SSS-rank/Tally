package com.sss.tally.domain.payment.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.sss.tally.api.payment.dto.PaymentDto;

@FeignClient(url = "https://j9a108.p.ssafy.io/wasApi", name = "paymentClient")
public interface PaymentClient {
	@PostMapping(value="/transfer/history/tally", consumes = "application/json")
	PaymentDto.PaymentResDto requestTransferList(@RequestHeader("Content-type") String contentType,
		@RequestBody PaymentDto.PaymentListReqDto paymentListReqDto);

}
