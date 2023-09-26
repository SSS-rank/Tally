package com.sss.tally.api.papago.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sss.tally.api.papago.dto.PapagoDto;
import com.sss.tally.api.papago.service.PapagoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/papago")
public class PapagoController {
	private final PapagoService papagoService;
	@PostMapping
	public ResponseEntity<String> getTransferLanguage(@RequestBody PapagoDto.PapagoReqDto papagoReqDto){
		String str = papagoService.getTransfer(papagoReqDto);
		return ResponseEntity.status(HttpStatus.OK).body(str);
	}
	@GetMapping("/{countryId}")
	public ResponseEntity<List<PapagoDto.PapagoRespDto>> getNecessary(@PathVariable Long countryId){
		List<PapagoDto.PapagoRespDto> necessaryList = papagoService.getNecessary(countryId);
		return ResponseEntity.status(HttpStatus.OK).body(necessaryList);
	}
}
