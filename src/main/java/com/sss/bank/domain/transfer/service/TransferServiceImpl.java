package com.sss.bank.domain.transfer.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.bank.api.transfer.dto.TransferDto;
import com.sss.bank.domain.account.entity.Account;
import com.sss.bank.domain.account.repository.AccountRepository;
import com.sss.bank.domain.bank.entity.Bank;
import com.sss.bank.domain.bank.repository.BankRepository;
import com.sss.bank.domain.member.entity.Member;
import com.sss.bank.domain.member.repository.MemberRepository;
import com.sss.bank.domain.transfer.entity.Transfer;
import com.sss.bank.domain.transfer.repository.TransferRepository;
import com.sss.bank.global.error.ErrorCode;
import com.sss.bank.global.error.exception.BusinessException;
import com.sss.bank.global.redis.service.RedisService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class TransferServiceImpl implements TransferService {

	private final MemberRepository memberRepository;

	private final AccountRepository accountRepository;

	private final TransferRepository transferRepository;

	private final BankRepository bankRepository;

	private final RedisService redisService;

	@Override
	public TransferDto.TransferDepositRespDto createTransfer(long memberId,
		TransferDto.TransferDepositReqDto transferDepositReqDto) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);
		if (memberOptional.isPresent()) {
			Member member = memberOptional.get();
			//출금 계좌
			Optional<Account> senderAccountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
				transferDepositReqDto.getSenderAccountNum());
			Account senderAccount = senderAccountOptional.get();
			//입금 계좌
			Optional<Account> recAccountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
				transferDepositReqDto.getReceiverAccountNum());
			Account recAccount = recAccountOptional.get();
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

			//0원체크
			if (transferDepositReqDto.getDepositAmount() <= 0) {
				throw new IllegalArgumentException("출금 금액은 0보다 커야 합니다.");
			}
			//출금 가능 체크
			if (recAccount.getBalance() < transferDepositReqDto.getDepositAmount()) {
				throw new IllegalArgumentException("잔액이 부족합니다.");
			}
			//이체하기(계좌 잔액 조정)
			Long depositAmount = transferDepositReqDto.getDepositAmount();
			Long balance = 0l;
			balance = senderAccount.getBalance() - depositAmount;
			senderAccount.updateBalance(balance);
			balance = recAccount.getBalance() + depositAmount;
			recAccount.updateBalance(balance);
			//거래내역 남기기
			String Uuid = UUID.randomUUID().toString();
			transferRepository.save(
				Transfer.of(transferDepositReqDto, Uuid, senderAccount, recAccount));

			String reqName = recAccount.getMemberId().getName();

			TransferDto.TransferDepositRespDto transferDepositRespDto = TransferDto.TransferDepositRespDto.of(reqName,
				depositAmount);

			return transferDepositRespDto;
		} else {
			throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);

		}

	}

	@Override
	public List<TransferDto.TransferListRespDto> getList(long memberId,
		TransferDto.TransferListReqDto transferListReqDto) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);
		int page = transferListReqDto.getPage();
		int limit = transferListReqDto.getLimit();
		Pageable fixedPageable = PageRequest.of(page, limit, Sort.by("transferDate").descending());
		if (memberOptional.isPresent()) {
			Optional<Account> accountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
				transferListReqDto.getAccountNum());
			if (accountOptional.isEmpty()) {
				throw new IllegalArgumentException("계좌번호가 존재하지 않습니다.");
			}
			Account account = accountOptional.get();
			if (!account.getPassword().equals(transferListReqDto.getAccountPassword())) {
				throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
			}
			Page<Transfer> transferList = transferRepository.findTransfersByDepositAccountIdOrWithdrawAccountId(account,
				fixedPageable);
			List<TransferDto.TransferListRespDto> transferListRespDtos = new ArrayList<>();
			for (Transfer transfer : transferList) {
				//출금자가 본인일때
				if (transfer.getSender().getAccountNumber().equals(transferListReqDto.getAccountNum())) {
					TransferDto.TransferListRespDto transferListRespDto = TransferDto.TransferListRespDto.of(transfer,
						"출금");

					transferListRespDtos.add(transferListRespDto);
				} else { //입금자가 본인일 때
					TransferDto.TransferListRespDto transferListRespDto = TransferDto.TransferListRespDto.of(transfer,
						"입금");

					transferListRespDtos.add(transferListRespDto);
				}
			}
			return transferListRespDtos;
		} else {
			throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
		}
	}

	@Override
	public String oneTransfer(long memberId, TransferDto.OnetransferReqDto onetransferReqDto) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);

		if (memberOptional.isPresent()) {
			Optional<Account> accountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
				onetransferReqDto.getAccountNum());
			if (accountOptional.isEmpty()) {
				throw new IllegalArgumentException("계좌번호가 존재하지 않습니다.");
			}
			Optional<Bank> bankOptional = bankRepository.findByBankCode(onetransferReqDto.getBankCode());
			if (bankOptional.isEmpty()) {
				throw new IllegalArgumentException("존재하지 않는 은행입니다.");
			}
			String senderAccountNum = "555111111111";
			String receiverAccountNum = onetransferReqDto.getAccountNum();
			Long depositAmount = 1l;
			String withdrawAccountContent = "1원 인증";
			StringBuilder stringBuilder = new StringBuilder();
			Random random = new Random();
			for (int i = 0; i < 4; i++) {
				int digit = random.nextInt(10);
				stringBuilder.append(digit);
			}
			String depositAccountContent = stringBuilder.toString();
			TransferDto.TransferDepositReqDto transferDepositReqDto = new TransferDto.TransferDepositReqDto(
				senderAccountNum, receiverAccountNum, depositAmount, withdrawAccountContent, depositAccountContent
			);

			createTransfer(1, transferDepositReqDto);
			redisService.setOneTrnasferValues(String.valueOf(onetransferReqDto.getAccountNum()), depositAccountContent);

			return depositAccountContent;
		} else {
			throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
		}

	}

	@Override
	public String oneTransferVerify(long memberId, TransferDto.OnetransferVerifyReqDto onetransferVerifyReqDto) {
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);

		if (memberOptional.isPresent()) {
			//레디스 검증 하면 됨 .  .  set 새로만들어 익스파이어 만들어서
			String redisCode = redisService.getValues(String.valueOf(onetransferVerifyReqDto.getAccountNum()));
			if (onetransferVerifyReqDto.getCode().equals(redisCode)) {
				Optional<Account> accountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
					onetransferVerifyReqDto.getAccountNum());
				if (accountOptional.isEmpty()) {
					throw new IllegalArgumentException("계좌번호가 존재하지 않습니다.");
				}
				Account account = accountOptional.get();
				return account.getPassword();
			} else {
				throw new IllegalArgumentException("인증 번호가 잘못되었습니다.");
			}
		} else {
			throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
		}
	}
}
