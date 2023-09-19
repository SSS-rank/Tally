package com.sss.tally.domain.member.service;

import org.springframework.security.core.Authentication;

public interface MemberService {
	void withdrawal(Authentication authentication);
}
