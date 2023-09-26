package com.sss.tally.api.papago.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.papago.client.PapagoClient;
import com.sss.tally.api.papago.dto.PapagoDto;
import com.sss.tally.domain.country.entity.Country;
import com.sss.tally.domain.country.repository.CountryRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.CountryException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PapagoServiceImpl implements PapagoService{
	private final PapagoClient papagoClient;
	private final CountryRepository countryRepository;

	@Value("${naver.client.id}")
	private String clientId;
	@Value("${naver.client.secret}")
	private String clientSecret;

	@Override
	public String getTransfer(PapagoDto.PapagoReqDto papagoReqDto) {
		String CONTENT_TYPE = "application/x-www-form-urlencoded; charset=UTF-8";
		PapagoDto.TransferRespDto transferRespDto = papagoClient.getTransfer(CONTENT_TYPE, clientId, clientSecret,
			papagoReqDto.getCountryCode(), papagoReqDto.getTransferCountryCode(), papagoReqDto.getContent());
		return transferRespDto.getMessage().getResult().getTranslatedText();
	}

	@Override
	public List<PapagoDto.PapagoRespDto> getNecessary(Long countryId) {
		Country country = countryRepository.findCountryByCountryId(countryId)
			.orElseThrow(()->new CountryException(ErrorCode.NOT_EXIST_COUNTRY));
		List<String> koreaLanguage = new ArrayList<>();
		koreaLanguage.add("안녕하세요");
		koreaLanguage.add("화장실이 어디인가요?");
		koreaLanguage.add("얼마인가요?");
		koreaLanguage.add("이거 주세요.");
		koreaLanguage.add("도와주세요.");
		koreaLanguage.add("사진 좀 찍어주세요.");
		koreaLanguage.add("하나 둘 셋 넷 다섯 여섯 일곱 여덟 아홉 열");
		koreaLanguage.add("싱겁게 해주세요.");

		List<PapagoDto.PapagoRespDto> result = new ArrayList<>();
		String transferLanguage = country.getLanguage();
		if(transferLanguage==null) transferLanguage = "en";

		for(String korea:koreaLanguage){
			String str = this.getTransfer(
				PapagoDto.PapagoReqDto.of(korea, "ko", transferLanguage));
			result.add(PapagoDto.PapagoRespDto.of(korea, str));
		}
		return result;
	}
}
