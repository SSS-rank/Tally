package com.sss.bank.domain.account.service;

import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.domain.account.dto.AccountDto;
import com.sss.bank.domain.account.repository.AccountRepository;
import com.sss.bank.domain.bank.entity.Bank;
import com.sss.bank.domain.bank.repository.BankRepository;
import com.sss.bank.domain.member.entity.Member;
import com.sss.bank.domain.member.repository.MemberRepository;
import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.BusinessException;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AccountServiceImpl implements AccountService {
	private final MemberRepository memberRepository;
	private final AccountRepository accountRepository;
	private final BankRepository bankRepository;

	@Transactional
	@Override
	public Boolean createAccount(long memberId, AccountDto.AccountCreateRequestDto accountCreateRequestDto) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);
		if (memberOptional.isPresent()) {
			System.out.println(accountCreateRequestDto.getBankCode());
			Optional<Bank> bankOptional = bankRepository.findByBankCode(accountCreateRequestDto.getBankCode());
			System.out.println(bankOptional.isPresent());
			System.out.println("ww" + bankOptional.isEmpty());
			if (bankOptional.isEmpty()) {
				throw new IllegalArgumentException("존재하지 않는 은행입니다.");
			}
			Bank bank = bankOptional.get();
			Optional<Integer> lastNumOptional = accountRepository.countRows();
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

			// 필요한 0을 추가
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
				accountCreateRequestDto.toAccountEntity(member, accountNumBuilder.toString(), uuid, bank));
			return true;
		} else {
			throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
		}
	}
}
