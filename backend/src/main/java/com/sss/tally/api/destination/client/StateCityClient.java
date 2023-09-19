package com.sss.tally.api.destination.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import com.sss.tally.api.destination.dto.DestinationDto;

@FeignClient(url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app", name = "statusClient")
public interface StateCityClient {
	@GetMapping(value="/v1/regcodes")
	DestinationDto.StateCityRespListDto requestStatusInfo(@RequestHeader("Content-type") String contentType,
		@RequestParam(value = "is_ignore_zero") boolean isIgnoreZero, @RequestParam("regcode_pattern") String regcodePattern);


}
