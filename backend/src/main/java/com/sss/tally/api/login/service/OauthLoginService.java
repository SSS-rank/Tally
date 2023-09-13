package com.sss.tally.api.login.service;

import com.sss.tally.api.login.dto.OauthLoginDto;

public interface OauthLoginService {
	OauthLoginDto.OauthLoginRespDto oauthLogin(String accessToken);
}
