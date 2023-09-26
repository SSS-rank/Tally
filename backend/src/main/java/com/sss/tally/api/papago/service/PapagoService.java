package com.sss.tally.api.papago.service;

import java.util.List;

import com.sss.tally.api.papago.dto.PapagoDto;

public interface PapagoService {
	String getTransfer(PapagoDto.PapagoReqDto papagoReqDto);
	List<PapagoDto.PapagoRespDto> getNecessary(Long countryId);
}
