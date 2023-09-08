package com.sss.bank.domain.member.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.domain.member.entity.Member;
import com.sss.bank.domain.member.repository.MemberRepository;
import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.AuthenticationException;
import com.sss.bank.global.redis.service.RedisService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService{
	private final MemberRepository memberRepository;
	private final RedisService redisService;
	@Override
	public LocalDateTime withdrawal(Long memberId) {
		Optional<Member> member = memberRepository.findMemberByMemberId(memberId);
		// refreshToken 만료시키기
		redisService.expireValues(String.valueOf(memberId));
		if(member.isEmpty()) {
			throw new AuthenticationException(ErrorCode.NOT_FOUND_MEMBER);
		}
		// 해당 회원 탈퇴 날짜 INSERT
		member.get().withdrawal(LocalDateTime.now());
		return member.get().getWithdrawalDate();
	}
}
