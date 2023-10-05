package com.sss.tally.domain.paymentunit.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.paymentunit.dto.PaymentUnitDto;
import com.sss.tally.domain.paymentunit.entity.PaymentUnit;
import com.sss.tally.domain.paymentunit.repository.PaymentUnitRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentUnitServiceImpl implements PaymentUnitService{
	private final PaymentUnitRepository paymentUnitRepository;
	@Override
	public List<PaymentUnitDto> getPaymentUnitList() {
		List<PaymentUnit> all = paymentUnitRepository.findAll();
		return all.stream()
			.map(PaymentUnitDto::from)
			.collect(Collectors.toList());
	}
}
