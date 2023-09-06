package com.sss.bank.external.oauth.kakao.service;

import java.util.Map;
import org.springframework.stereotype.Service;

import com.sss.bank.external.oauth.service.SocialLoginApiService;

@Service
public class SocialLoginApiServiceFactory {
	private static Map<String, SocialLoginApiService> socialLoginApiServiceMap;

	public SocialLoginApiServiceFactory(Map<String, SocialLoginApiService> socialLoginApiServiceMap){
		this.socialLoginApiServiceMap = socialLoginApiServiceMap;
	}

	public static SocialLoginApiService getSocialLoginApiService(){
		return socialLoginApiServiceMap.get("kakaoLoginApiServiceImpl");
	}
}
