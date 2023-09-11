package com.sss.bank.domain.account.service;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.api.account.dto.AccountDto;
import com.sss.bank.api.password.service.PasswordRepository;
import com.sss.bank.domain.account.entity.Account;
import com.sss.bank.domain.account.repository.AccountRepository;
import com.sss.bank.domain.bank.entity.Bank;
import com.sss.bank.domain.bank.repository.BankRepository;
import com.sss.bank.domain.member.entity.Member;
import com.sss.bank.domain.member.repository.MemberRepository;
import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.AccountException;
import com.sss.bank.global.error.exception.BankException;
import com.sss.bank.global.error.exception.BusinessException;
import com.sss.bank.global.error.exception.MemberException;
import com.sss.bank.global.resolver.MemberInfoDto;
import com.sss.bank.global.util.SHA256Util;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class AccountServiceImpl implements AccountService {
	private final MemberRepository memberRepository;
	private final AccountRepository accountRepository;
	private final BankRepository bankRepository;
	private final SHA256Util sha256Util;
	private final PasswordRepository passwordRepository;

	@Override
	public AccountDto.AccountCreateRespDto createAccount(long memberId,
		AccountDto.AccountCreateReqDto accountCreateReqDto) throws
		NoSuchAlgorithmException {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);
		if (memberOptional.isEmpty()) {
			throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
		}
		Optional<Bank> bankOptional = bankRepository.findBankByBankCode(accountCreateReqDto.getBankCode());
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

		String salt = SHA256Util.createSalt();
		String password = SHA256Util.getEncrypt(accountCreateReqDto.getAccountPassword(), salt);
		Account save = accountRepository.save(
			Account.of(member, salt, password, accountNumBuilder.toString(), uuid, bank));
		return AccountDto.AccountCreateRespDto.from(save);
	}

	@Override
	public Boolean deleteAccount(long memberId, AccountDto.AccountDeleteReqDto accountDeleteReqDto) throws
		NoSuchAlgorithmException {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);
		if (memberOptional.isEmpty()) {
			throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
		}
		Optional<Bank> bankOptional = bankRepository.findBankByBankCode(accountDeleteReqDto.getBankCode());
		if (bankOptional.isEmpty()) {
			throw new IllegalArgumentException("존재하지 않는 은행입니다.");
		}
		Optional<Account> accountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
			accountDeleteReqDto.getAccountNum());
		if (accountOptional.isEmpty()) {
			throw new IllegalArgumentException("존재하지 않는 계좌입니다.");
		}
		Account account = accountOptional.get();

		if (!passwordRepository.checkPassword(accountDeleteReqDto.getAccountNum(),
			accountDeleteReqDto.getAccountPassword())) {
			throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
		}
		if (!account.getBankId().getBankCode().equals(accountDeleteReqDto.getBankCode())) {
			throw new IllegalArgumentException("은행 코드가 일치하지 않습니다.");
		}
		account.updateStatus(true);
		return true;

	}

	@Override
	public AccountDto.AccountGetBalanceRespDto getBalance(long memberId,
		AccountDto.AccountGetBalanceReqDto accountGetBalanceReqDto) throws NoSuchAlgorithmException {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);
		if (memberOptional.isEmpty()) {
			throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
		}
		Optional<Account> accountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
			accountGetBalanceReqDto.getAccountNum());

		if (accountOptional.isEmpty()) {
			throw new IllegalArgumentException("계좌 정보를 찾을 수 없습니다.");
		}
		Account account = accountOptional.get();
		if (!passwordRepository.checkPassword(accountGetBalanceReqDto.getAccountNum(),
			accountGetBalanceReqDto.getAccountPassword())) {
			throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
		}
		AccountDto.AccountGetBalanceRespDto accountGetBalanceRespDto = AccountDto.AccountGetBalanceRespDto.from(
			account);

		return accountGetBalanceRespDto;

	}

	@Override
	public AccountDto.AccountGetBalanceRespDto getBalanceTally(long memberId,
		AccountDto.AccountGetBalanceReqDto accountGetBalanceReqDto) throws NoSuchAlgorithmException {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);
		if (memberOptional.isEmpty()) {
			throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
		}
		Optional<Account> accountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
			accountGetBalanceReqDto.getAccountNum());

		if (accountOptional.isEmpty()) {
			throw new IllegalArgumentException("계좌 정보를 찾을 수 없습니다.");
		}
		Account account = accountOptional.get();
		if (!passwordRepository.checkPasswordTally(accountGetBalanceReqDto.getAccountNum(),
			accountGetBalanceReqDto.getAccountPassword())) {
			throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
		}
		AccountDto.AccountGetBalanceRespDto accountGetBalanceRespDto = AccountDto.AccountGetBalanceRespDto.from(
			account);

		return accountGetBalanceRespDto;
	}

	@Override
	public List<AccountDto> getAccountList(MemberInfoDto memberInfoDto, String bankCode) {
		// 회원 존재 확인
		Optional<Member> member = memberRepository.findMemberByMemberId(memberInfoDto.getMemberId());
		if (member.isEmpty())
			throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

		// 은행 코드 존재 확인
		Optional<Bank> bank = bankRepository.findBankByBankCode(bankCode);
		if (bank.isEmpty())
			throw new BankException(ErrorCode.NOT_EXIST_BANK);

		List<Account> accounts = accountRepository.findAllByMemberId_MemberIdAndBankId_BankIdAndStatusIsFalse(
			member.get()
				.getMemberId(), bank.get().getBankId());

		return accounts.stream()
			.map(AccountDto::from)
			.collect(Collectors.toList());
	}

	@Override
	public AccountDto.AccountGetOwnerDto getAccountOwner(String bankNumber) {
		// 해당 계좌가 존재하지 않는 경우
		Optional<Account> account = accountRepository.findAccountByAccountNumberAndStatusIsFalse(bankNumber);
		if (account.isEmpty())
			throw new AccountException(ErrorCode.NOT_EXIST_ACCOUNT);

		// 해당 회원이 존재하지 않는 경우
		Optional<Member> member = memberRepository.findMemberByMemberId(account.get().getMemberId().getMemberId());
		if (member.isEmpty())
			throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

		return AccountDto.AccountGetOwnerDto.from(member.get());

	}
}
