package com.sss.tally.domain.device.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.device.entity.Device;

public interface DeviceRepository extends JpaRepository<Device, Long> {
	List<Device> findDevicesByDeviceToken(String deviceToken);
}
