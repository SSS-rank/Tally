package com.sss.bank.domain.account.service;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.sss.bank.api.account.dto.AccountDto;
import com.sss.bank.global.resolver.MemberInfoDto;

public interface AccountService {
	Boolean createAccount(long memberId, AccountDto.AccountCreateReqDto accountCreateReqDto) throws
		NoSuchAlgorithmException;

	Boolean deleteAccount(long memberId, AccountDto.AccountDeleteReqDto accountDeleteReqDto) throws
		NoSuchAlgorithmException;

	AccountDto.AccountGetBalanceRespDto getBalance(long memberId,
		AccountDto.AccountGetBalanceReqDto accountGetBalanceReqDto) throws NoSuchAlgorithmException;

	AccountDto.AccountGetBalanceRespDto getBalanceTally(long memberId,
		AccountDto.AccountGetBalanceReqDto accountGetBalanceReqDto) throws
		NoSuchAlgorithmException;

	List<AccountDto> getAccountList(MemberInfoDto memberInfoDto, String bankCode);

	AccountDto.AccountGetOwnerDto getAccountOwner(String bankNumber);
}
