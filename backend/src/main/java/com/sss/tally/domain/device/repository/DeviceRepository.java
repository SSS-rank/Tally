package com.sss.tally.domain.device.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.tally.domain.device.entity.Device;

public interface DeviceRepository extends JpaRepository<Device, Integer> {
	Optional<List<Device>> findDevicesByDeviceToken(String deviceToken);
}
