package com.sss.bank.domain.member.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.domain.member.entity.Member;
import com.sss.bank.domain.member.repository.MemberRepository;
import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.BusinessException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;

	// 회원가입
	public Member registerMember(Member member){
		return memberRepository.save(member);
	}

	// 이미 회원인 사용자인지 체크
	private void CheckDuplicateMember(Member member){
		Optional<Member> optionalMember = memberRepository.findByKakaoId(member.getKakaoId());
		if(optionalMember.isPresent()){
			throw new BusinessException(ErrorCode.ALREADY_REGISTER_MEMBER);
		}
	}
}
