package com.sss.bank.domain.member.service;

import java.time.LocalDateTime;

import com.sss.bank.api.member.dto.MemberDto;

public interface MemberService {
	LocalDateTime withdrawal(Long memberId);
	MemberDto.MemberRespDto addInfo(Long memberId, MemberDto.MemberReqDto memberReqDto);
}
