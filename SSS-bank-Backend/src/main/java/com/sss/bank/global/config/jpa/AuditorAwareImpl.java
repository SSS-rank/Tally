package com.sss.bank.global.config.jpa;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.util.StringUtils;

public class AuditorAwareImpl implements AuditorAware<String> {

	@Autowired
	private HttpServletRequest httpServletRequest;

	/*
	 *  수정자의 정보를 담아 반환하는 함수
	 *  수정자를 알수 없다면 unknown을 담아 보낸다.
	 * */
	@Override
	public Optional<String> getCurrentAuditor() {
		String modifiedBy = httpServletRequest.getRequestURI(); // 수정자의 정보를 담는다.
		if (!StringUtils.hasText(modifiedBy)) {
			modifiedBy = "unknown";
		}
		return Optional.of(modifiedBy);
	}
}
