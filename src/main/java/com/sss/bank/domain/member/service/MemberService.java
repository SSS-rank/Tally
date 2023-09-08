package com.sss.bank.domain.member.service;

import java.time.LocalDateTime;

public interface MemberService {
	LocalDateTime withdrawal(Long memberId);
}
