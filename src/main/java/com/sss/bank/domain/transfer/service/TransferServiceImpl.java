package com.sss.bank.domain.transfer.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.sss.bank.domain.account.entity.Account;
import com.sss.bank.domain.account.repository.AccountRepository;
import com.sss.bank.domain.member.entity.Member;
import com.sss.bank.domain.member.repository.MemberRepository;
import com.sss.bank.domain.transfer.dto.TransferDepositReqDto;
import com.sss.bank.domain.transfer.dto.TransferDepositRespDto;
import com.sss.bank.domain.transfer.repository.TransferRepository;
import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.BusinessException;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class TransferServiceImpl implements TransferService {

	private final MemberRepository memberRepository;

	private final AccountRepository accountRepository;

	private final TransferRepository transferRepository;

	@Override
	public TransferDepositRespDto createTransfer(TransferDepositReqDto transferDepositReqDto, long memberId) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);
		if (memberOptional.isPresent()) {
			Member member = memberOptional.get();
			//출금 계좌
			Account senderAccount = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
				transferDepositReqDto.getSenderAccountNum());
			//입금 계좌
			Account recAccount = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
				transferDepositReqDto.getReceiverAccountNum());
			// 출금계좌와 입금계좌가 동일하면 안됨
			if (transferDepositReqDto.getSenderAccountNum().equals(transferDepositReqDto.getReceiverAccountNum())) {
				throw new BusinessException(ErrorCode.DUPLICATE_ACCOUNT);
			}
			// 출금계좌 확인
			if (senderAccount == null) {
				throw new BusinessException(ErrorCode.INVALID_WITHDRAW_ACCOUNT);
			}
			// 입금계좌 확인
			if (recAccount == null) {
				throw new BusinessException(ErrorCode.INVALID_DEPOSIT_ACCOUNT);
			}

			//출금계좌 소유자랑 입금계좌 소유자가 로그인한 사용자것인지 확인
			if (senderAccount.getMemberId() != member) {
				throw new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS);
			}

			//출금계좌 잔액 확인
			if (senderAccount.getBalance() < transferDepositReqDto.getDepositAmount()) {
				throw new BusinessException(ErrorCode.INSUFFICIENT_FUNDS);
			}

			//이체하기(계좌 잔액 조정)
			senderAccount.withdraw(transferDepositReqDto.getDepositAmount());
			recAccount.deposit(transferDepositReqDto.getDepositAmount());
			//거래내역 남기기
			String Uuid = UUID.randomUUID().toString();
			transferRepository.save(
				transferDepositReqDto.toTransferEntity(Uuid, senderAccount, recAccount));

			String reqName = recAccount.getMemberId().getName();
			Long balance = transferDepositReqDto.getDepositAmount();
			TransferDepositRespDto transferDepositRespDto = new TransferDepositRespDto(reqName, balance);
			return transferDepositRespDto;
		} else {
			throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);

		}

	}
}
