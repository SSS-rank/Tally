package com.sss.tally.external.kakao.service;

import com.sss.tally.external.model.OAuthAttributes;

public interface KakaoLoginApiService {
	OAuthAttributes getMemberInfo(String accessToken);
}
