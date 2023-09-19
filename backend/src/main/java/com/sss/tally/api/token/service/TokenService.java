package com.sss.tally.api.token.service;

import com.sss.tally.api.token.dto.TokenDto;

public interface TokenService {
	TokenDto.TokenRespDto createAccessToken(String refreshToken);
}
