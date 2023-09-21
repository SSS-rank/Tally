package com.sss.tally.domain.account.service;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.account.dto.AccountDto;
import com.sss.tally.domain.account.client.AccountInfoClient;
import com.sss.tally.domain.account.entity.Account;
import com.sss.tally.domain.account.repository.AccountRepository;
import com.sss.tally.domain.bank.entity.Bank;
import com.sss.tally.domain.bank.repository.BankRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.AccountException;
import com.sss.tally.global.error.exception.MemberException;
import com.sss.tally.global.util.SHA256Util;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{
	private final AccountRepository accountRepository;
	private final MemberRepository memberRepository;
	private final AccountInfoClient accountInfoClient;
	private final BankRepository bankRepository;
	@Override
	public void createAccount(Authentication authentication, AccountDto.AccountCreateReqDto accountCreateReqDto) throws
		NoSuchAlgorithmException {
		Member auth = (Member)authentication.getPrincipal();
		Member member = memberRepository.findByMemberUuid(auth.getMemberUuid())
			.orElseThrow(()->new MemberException(ErrorCode.NOT_EXIST_MEMBER));

		Account account;
		if(accountCreateReqDto.getOrderNumber()==1){ // 첫번째 계좌 등록
			account = Account.of(member, accountCreateReqDto, true);
			String salt = SHA256Util.createSalt();
			String password = SHA256Util.getEncrypt(accountCreateReqDto.getTransferPassword(), salt);
			member.createPassword(password, salt);
		} else account = Account.of(member, accountCreateReqDto, false);

		accountRepository.save(account);
	}

	@Override
	public void deleteAccount(String accountNumber) {
		Account account = accountRepository.findAccountByAccountNumberAndStatusIsFalse(accountNumber)
			.orElseThrow(()->new AccountException(ErrorCode.NOT_EXIST_ACCOUNT));
		account.updateStatus(true);
	}

	@Override
	public Long getBalance(String accountNumber) {
		Account account = accountRepository.findAccountByAccountNumberAndStatusIsFalse(accountNumber)
			.orElseThrow(()->new AccountException(ErrorCode.NOT_EXIST_ACCOUNT));
		String CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
		AccountDto.AccountInfoReqDto accountInfoReqDto = AccountDto.AccountInfoReqDto.of(account);
		AccountDto.AccountInfoRespDto accountInfoRespDto = accountInfoClient.getAccountBalance(
			CONTENT_TYPE, accountInfoReqDto);
		return accountInfoRespDto.getBalance();
	}

	@Override
	public List<AccountDto.AccountRespDto> getAccountList(Authentication authentication) {
		Member auth = (Member)authentication.getPrincipal();
		List<Account> accountList = accountRepository.findAllByMemberIdAndStatusIsFalseOrderByOrderNumberAsc(auth);
		List<AccountDto.AccountRespDto> list = new ArrayList<>();

		if(accountList.size()==0) return null;
		for(Account account:accountList){
			Long balance = this.getBalance(account.getAccountNumber());
			Bank bank =  bankRepository.findBankByBankCode(account.getBankCode())
				.orElseThrow(()->new AccountException(ErrorCode.NOT_EXIST_BANK));
			list.add(AccountDto.AccountRespDto.of(account, balance, bank.getBankName()));
		}
		return list;
	}

	@Override
	public void updateMainAccount(Authentication authentication, String accountNumber) {
		Member auth = (Member)authentication.getPrincipal();
		Optional<Account> account = accountRepository.findAccountByMemberIdAndStatusIsFalseAndRepresentativeAccountIsTrue(auth);
		account.ifPresent(value -> value.updateRepresentative(false));

		account = accountRepository.findAccountByAccountNumberAndStatusIsFalse(accountNumber);
		account.ifPresent(value -> value.updateRepresentative(true));
	}
}
