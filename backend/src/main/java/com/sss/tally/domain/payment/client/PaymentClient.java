package com.sss.tally.domain.payment.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.sss.tally.api.payment.dto.PaymentDto;

@FeignClient(url = "http://j9a108.p.ssafy.io:8011/", name = "paymentClient")
public interface PaymentClient {
	@GetMapping(value="/transfer/history/tally", consumes = "application/json")
	List<PaymentDto.PaymentListRespDto> requestTransferList(@RequestHeader("Content-type") String contentType,
		@SpringQueryMap PaymentDto.PaymentListReqDto paymentListReqDto);

}
