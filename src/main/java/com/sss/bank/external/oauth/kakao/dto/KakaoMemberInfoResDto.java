package com.sss.bank.external.oauth.kakao.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoMemberInfoResDto {
	private Long id;

	@JsonProperty("kakao_account")
	private KakaoAccount kakaoAccount;

	@Getter
	@Setter
	public static class KakaoAccount {
		private String email;
		private Profile profile;

		@Getter
		@Setter
		public static class Profile {
			private String nickname;
		}
	}
}
