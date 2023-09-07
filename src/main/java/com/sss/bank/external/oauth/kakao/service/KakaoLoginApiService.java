package com.sss.bank.external.oauth.kakao.service;

import com.sss.bank.external.oauth.model.OAuthAttributes;

public interface KakaoLoginApiService {
	OAuthAttributes getUserInfo(String accessToken);
}
