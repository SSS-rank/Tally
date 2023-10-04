package com.sss.tally.domain.device.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.device.entity.Device;
import com.sss.tally.domain.member.entity.Member;

public interface DeviceRepository extends JpaRepository<Device, Long> {
	Optional<Device> findDeviceByDeviceTokenAndIsLoginIsTrue(String deviceToken);

	Optional<Device> findDeviceByDeviceTokenAndMemberId(String deviceToken, Member member);

	Optional<Device> findDeviceByMemberIdAndIsLoginIsTrue(Member member);

	List<Device> findDevicesByDeviceTokenAndDeviceStatusIsTrueAndIsLoginIsTrue(String deviceToken);

	Optional<Device> findDeviceByMemberIdAndDeviceStatusIsTrueAndIsLoginIsTrue(Member member);

	List<Device> findDevicesByMemberId(Member member);
}


