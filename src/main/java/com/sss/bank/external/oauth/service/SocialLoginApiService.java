package com.sss.bank.external.oauth.service;

import com.sss.bank.external.oauth.model.OAuthAttributes;

public interface SocialLoginApiService {
	OAuthAttributes getUserInfo(String accessToken);
}
