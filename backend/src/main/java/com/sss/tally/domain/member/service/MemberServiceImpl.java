package com.sss.tally.domain.member.service;

import java.time.LocalDateTime;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.MemberException;
import com.sss.tally.global.redis.service.RedisService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{
	private final RedisService redisService;

	@Override
	public void withdrawal(Authentication authentication) {
		Member member = (Member)authentication.getPrincipal();
		String refreshToken = redisService.getValues(member.getMemberUuid());
		if(StringUtils.hasText(refreshToken)){
			redisService.expireValues(member.getMemberUuid());
		} else {
			throw new MemberException(ErrorCode.NOT_VALID_TOKEN);
		}
		member.withdrawal(LocalDateTime.now());
	}
}
