package com.sss.bank.external.oauth.model;

import com.sss.bank.domain.member.entity.Member;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OAuthAttributes {
	private Long kakaoId;
	private String email;
	private String name;
}
