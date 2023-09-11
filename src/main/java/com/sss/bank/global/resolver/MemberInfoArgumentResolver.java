package com.sss.bank.global.resolver;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.sss.bank.global.jwt.service.TokenManager;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MemberInfoArgumentResolver implements HandlerMethodArgumentResolver {
	private final TokenManager tokenManager;

	@Override
	public boolean supportsParameter(MethodParameter parameter){
		boolean hasMemberInfoAnnotation = parameter.hasParameterAnnotation(MemberInfo.class);
		boolean hasMemberInfoDto = MemberInfoDto.class.isAssignableFrom(parameter.getParameterType());
		return hasMemberInfoAnnotation && hasMemberInfoDto;
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mvContainer, NativeWebRequest webRequest, WebDataBinderFactory webDataBinderFactory) throws  Exception{
		HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
		String authorizationHeader = request.getHeader("Authorization");
		String token = authorizationHeader.split(" ")[1];
		Claims tokenClaims = tokenManager.getTokenClaims(token);
		Long memberId = Long.valueOf((Integer) tokenClaims.get("memberId"));

		return MemberInfoDto.from(memberId);
	}

}
