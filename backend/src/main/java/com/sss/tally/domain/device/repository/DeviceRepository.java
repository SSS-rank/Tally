package com.sss.tally.domain.device.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.device.entity.Device;
import com.sss.tally.domain.member.entity.Member;

public interface DeviceRepository extends JpaRepository<Device, Long> {
	List<Device> findDevicesByDeviceTokenAndDeviceStatusIsFalseAndIsLogoutIsFalse(String deviceToken);

	Optional<Device> findDeviceByMemberIdAndDeviceStatusIsFalseAndIsLogoutIsFalse(Member member);
}
