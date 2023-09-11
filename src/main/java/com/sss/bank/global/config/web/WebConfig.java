package com.sss.bank.global.config.web;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.sss.bank.global.interceptor.AuthenticationIntercepter;
import com.sss.bank.global.resolver.MemberInfoArgumentResolver;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
	private final MemberInfoArgumentResolver memberInfoArgumentResolver;
	private final AuthenticationIntercepter authenticationIntercepter;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins(
				// "http://localhost:8080",
				"*"
			)
			.allowedMethods(
				HttpMethod.GET.name(),
				HttpMethod.POST.name(),
				HttpMethod.PATCH.name(),
				HttpMethod.DELETE.name(),
				HttpMethod.OPTIONS.name()
			);
	}

	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(authenticationIntercepter)
			.order(1)
			.addPathPatterns("/**")
			.excludePathPatterns("/login", "/access-token/issue",
				"/health");

	}

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
		resolvers.add(memberInfoArgumentResolver);
	}
}
