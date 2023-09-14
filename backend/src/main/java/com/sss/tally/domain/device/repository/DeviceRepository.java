package com.sss.tally.domain.device.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.device.entity.Device;

public interface DeviceRepository extends JpaRepository<Device, Long> {
	Optional<List<Device>> findDevicesByDeviceToken(String deviceToken);
}
