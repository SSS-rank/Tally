package com.sss.tally.api.logout.service;


import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.domain.device.entity.Device;
import com.sss.tally.domain.device.repository.DeviceRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.global.redis.service.RedisService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class LogoutServiceImpl implements LogoutService{
	private final RedisService redisService;
	private final DeviceRepository deviceRepository;
	@Override
	public void logout() {
		Member member = (Member)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		// member refreshtoken redis에서 제거
		if(redisService.getValues(member.getMemberUuid())!=null){
			redisService.expireValues(member.getMemberUuid());
		}
		// 해당 device 로그아웃 처리
		Optional<Device> device = deviceRepository.findDeviceByMemberIdAndIsLoginIsTrue(member);
		device.ifPresent(value -> value.updateLogin(false));
	}
}
