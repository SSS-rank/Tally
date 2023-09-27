package com.sss.bank.domain.account.service;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.sss.bank.api.account.dto.AccountDto;
import com.sss.bank.api.transfer.dto.TransferDto;
import com.sss.bank.global.resolver.MemberInfoDto;

public interface AccountService {
	AccountDto.AccountCreateRespDto createAccount(long memberId,
		AccountDto.AccountCreateReqDto accountCreateReqDto) throws
		NoSuchAlgorithmException;

	void deleteAccount(long memberId, AccountDto.AccountDeleteReqDto accountDeleteReqDto) throws
		NoSuchAlgorithmException;

	AccountDto.AccountGetBalanceRespDto getBalance(long memberId,
		AccountDto.AccountGetBalanceReqDto accountGetBalanceReqDto) throws NoSuchAlgorithmException;

	AccountDto.AccountGetBalanceRespDto getBalanceTally(AccountDto.AccountGetBalanceTallyReqDto accountGetBalanceReqDto) throws
		NoSuchAlgorithmException;

	List<AccountDto> getAccountList(MemberInfoDto memberInfoDto, String bankCode);

	List<AccountDto> getAccountList(MemberInfoDto memberInfoDto);

	AccountDto.AccountGetOwnerDto getAccountOwner(String bankNumber);

	List<TransferDto.TransferLatestRespDto> getLatestAccountList(MemberInfoDto memberInfoDto, String accountUuid);
}
