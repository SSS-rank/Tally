package com.sss.bank.domain.account.service;

import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.api.account.dto.AccountDto;
import com.sss.bank.domain.account.entity.Account;
import com.sss.bank.domain.account.repository.AccountRepository;
import com.sss.bank.domain.bank.entity.Bank;
import com.sss.bank.domain.bank.repository.BankRepository;
import com.sss.bank.domain.member.entity.Member;
import com.sss.bank.domain.member.repository.MemberRepository;
import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.BusinessException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class AccountServiceImpl implements AccountService {
	private final MemberRepository memberRepository;
	private final AccountRepository accountRepository;
	private final BankRepository bankRepository;

	@Override
	public Boolean createAccount(long memberId, AccountDto.AccountCreateReqDto accountCreateReqDto) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);
		if (memberOptional.isPresent()) {
			Optional<Bank> bankOptional = bankRepository.findByBankCode(accountCreateReqDto.getBankCode());
			if (bankOptional.isEmpty()) {
				throw new IllegalArgumentException("존재하지 않는 은행입니다.");
			}
			Bank bank = bankOptional.get();
			Optional<Integer> lastNumOptional = accountRepository.countAccountRows();
			Integer lastNum = lastNumOptional.get();
			if (lastNum >= 9999) {
				lastNum -= 9998;
			}

			StringBuilder accountNumBuilder = new StringBuilder("555");
			Random random = new Random();
			for (int i = 0; i < 4; i++) {
				int digit = random.nextInt(10);
				accountNumBuilder.append(digit);
			}

			String lastnumToString = String.valueOf(lastNum + 1);

			int numberOfZeros = 4 - lastnumToString.length();

			for (int i = 0; i < numberOfZeros; i++) {
				accountNumBuilder.append("0");
			}

			accountNumBuilder.append(lastnumToString);

			int sum = 0;
			for (int i = 0; i < accountNumBuilder.length(); i++) {
				sum += Character.getNumericValue(accountNumBuilder.charAt(i));
			}
			int lastDigit = sum % 10;

			accountNumBuilder.append(lastDigit);

			Member member = memberOptional.get();
			String uuid = UUID.randomUUID().toString();

			accountRepository.save(
				Account.of(accountCreateReqDto, member, accountNumBuilder.toString(), uuid, bank));
			return true;
		} else {
			throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
		}
	}

	@Transactional
	@Override
	public Boolean deleteAccount(long memberId, AccountDto.AccountDeleteReqDto accountDeleteReqDto) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);
		if (memberOptional.isPresent()) {
			Optional<Bank> bankOptional = bankRepository.findByBankCode(accountDeleteReqDto.getBankCode());
			if (bankOptional.isEmpty()) {
				throw new IllegalArgumentException("존재하지 않는 은행입니다.");
			}
			Optional<Account> accountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
				accountDeleteReqDto.getAccountNum());
			if (accountOptional.isEmpty()) {
				throw new IllegalArgumentException("존재하지 않는 계좌입니다.");
			}
			Account account = accountOptional.get();

			if (!account.getPassword().equals(accountDeleteReqDto.getAccountPassword())) {
				throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
			}
			if (!account.getBankId().getBankCode().equals(accountDeleteReqDto.getBankCode())) {
				throw new IllegalArgumentException("은행 코드가 일치하지 않습니다.");
			}
			account.updateStatus(true);
			return true;
		} else {
			throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
		}

	}

	@Override
	public AccountDto.AccountGetBalanceRespDto getBalance(long memberId,
		AccountDto.AccountGetBalanceReqDto accountGetBalanceReqDto) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);
		if (memberOptional.isPresent()) {
			Optional<Account> accountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
				accountGetBalanceReqDto.getAccountNum());

			if (accountOptional.isEmpty()) {
				throw new IllegalArgumentException("계좌 정보를 찾을 수 없습니다.");
			}
			Account account = accountOptional.get();
			if (!account.getPassword().equals(accountGetBalanceReqDto.getAccountPassword())) {
				throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
			}
			AccountDto.AccountGetBalanceRespDto accountGetBalanceRespDto = AccountDto.AccountGetBalanceRespDto.from(
				account);

			return accountGetBalanceRespDto;
		} else {
			throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
		}
	}
}
