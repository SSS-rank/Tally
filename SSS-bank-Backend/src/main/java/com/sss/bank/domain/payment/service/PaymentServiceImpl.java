package com.sss.bank.domain.payment.service;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.api.password.service.PasswordRepository;
import com.sss.bank.api.payment.dto.PaymentDto;
import com.sss.bank.domain.account.entity.Account;
import com.sss.bank.domain.account.repository.AccountRepository;
import com.sss.bank.domain.payment.entity.Payment;
import com.sss.bank.domain.payment.repository.PaymentRepository;
import com.sss.bank.domain.shop.entity.Shop;
import com.sss.bank.domain.shop.repository.ShopRepository;
import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.AccountException;
import com.sss.bank.global.error.exception.PaymentException;
import com.sss.bank.global.error.exception.ShopException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

	private final PaymentRepository paymentRepository;
	private final ShopRepository shopRepository;
	private final AccountRepository accountRepository;
	private final PasswordRepository passwordRepository;

	@Override
	public PaymentDto.PaymentRespDto createPayment(Long memberId, PaymentDto.PaymentReqDto paymentReqDto) throws
		NoSuchAlgorithmException {
		// 0. 존재하는 sender 인지 확인
		Optional<Account> account = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
			paymentReqDto.getSenderAccountNum());
		if (account.isEmpty()) {
			throw new AccountException(ErrorCode.INVALID_WITHDRAW_ACCOUNT);
		}
		// 1. 결제자와 사용자가 같은 사람인지 확인
		if(!account.get().getMemberId().getMemberId().equals(memberId)){
			throw new PaymentException(ErrorCode.NOT_EXIST_ACCOUNT);
		}
		// 2. 비밀 번호 체크
		if (!passwordRepository.checkPassword(paymentReqDto.getSenderAccountNum(), paymentReqDto.getPassword()))
			throw new AccountException(ErrorCode.INVALID_ACCOUNT_PASSWORD);

		// 3. 잔액 확인
		Long balance = account.get().getBalance();
		if (balance < paymentReqDto.getPaymentAmount())
			throw new AccountException(ErrorCode.INSUFFICIENT_FUNDS);

		// 4. 존재하는 shop인지 확인
		Optional<Shop> shop = shopRepository.findShopByShopId(paymentReqDto.getShopId());
		if (shop.isEmpty()) {
			throw new ShopException(ErrorCode.NOT_EXIST_SHOP);
		}

		// 5. 결제
		// - 잔액 변경
		account.get().updateBalance(balance - paymentReqDto.getPaymentAmount());
		// - 결제 내역 생성
		paymentRepository.save(Payment.of(paymentReqDto, UUID.randomUUID().toString(), account.get(), shop.get()));
		return PaymentDto.PaymentRespDto.of(shop.get().getShopName(), balance - paymentReqDto.getPaymentAmount());
	}
}
