package com.sss.tally.domain.account.service;

import java.security.NoSuchAlgorithmException;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.account.dto.AccountDto;
import com.sss.tally.domain.account.entity.Account;
import com.sss.tally.domain.account.repository.AccountRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.MemberException;
import com.sss.tally.global.util.SHA256Util;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{
	private final AccountRepository accountRepository;
	private final MemberRepository memberRepository;
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
}
