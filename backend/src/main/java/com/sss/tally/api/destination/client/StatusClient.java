package com.sss.tally.api.destination.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.sss.tally.api.destination.dto.DestinationDto;

@FeignClient(url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app", name = "statusClient")
public interface StatusClient {
	@GetMapping(value="/v1/regcodes")
	DestinationDto.StatusRespListDto requestStatusInfo(@RequestHeader("Content-type") String contentType,
		@SpringQueryMap DestinationDto.StatusCityReqDto request);


}
