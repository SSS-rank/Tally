package com.sss.tally.external.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OAuthAttributes {
	private Long kakaoId;
	private String nickname;
	private String profileImageUrl;
}
