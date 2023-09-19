package com.sss.tally.domain.member.service;

import org.springframework.security.core.Authentication;

import com.sss.tally.api.member.dto.MemberDto;

public interface MemberService {
	void withdrawal(Authentication authentication);
	MemberDto.MemberRespDto getMemberInfo(Authentication authentication);
	MemberDto.MemberRespDto patchMemberInfo(Authentication authentication, MemberDto.MemberReqDto memberReqDto);

}
