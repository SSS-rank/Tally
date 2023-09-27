package com.sss.tally.domain.member.service;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import com.sss.tally.api.member.dto.MemberDto;

public interface MemberService {
	void withdrawal(Authentication authentication);
	MemberDto.MemberRespDto getMemberInfo(Authentication authentication);
	MemberDto.MemberRespDto patchMemberInfo(Authentication authentication, String nickname, MultipartFile file) throws
		IOException;

	void patchPassword(Authentication authentication, MemberDto.MemberPasswordDto memberPasswordDto) throws
		NoSuchAlgorithmException;

	Boolean checkPassword(Authentication authentication, MemberDto.MemberPasswordDto memberPasswordDto) throws
		NoSuchAlgorithmException;
}
