package com.sss.tally.api.papago.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class PapagoDto {

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PapagoReqDto{
		private String content;
		private String countryCode;
		private String transferCountryCode;

		public static PapagoReqDto of(String content, String countryCode, String transferCountryCode){
			return PapagoReqDto.builder()
				.content(content)
				.countryCode(countryCode)
				.transferCountryCode(transferCountryCode)
				.build();
		}
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class PapagoRespDto{
		private String koreaLanguage;
		private String transferLanguage;
		public static PapagoRespDto of(String koreaLanguage, String transferLanguage){
			return PapagoRespDto.builder()
				.koreaLanguage(koreaLanguage)
				.transferLanguage(transferLanguage)
				.build();
		}
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static class TransferRespDto{

		@JsonProperty("message")
		private PapagoDto.TransferRespDto.Message message;
		@Getter
		@Setter
		public static class Message {
			private PapagoDto.TransferRespDto.Message.Result result;

			@Getter
			@Setter
			public static class Result {
				private String srcLangType;
				private String tarLangType;
				private String translatedText;
			}
		}
	}
}
