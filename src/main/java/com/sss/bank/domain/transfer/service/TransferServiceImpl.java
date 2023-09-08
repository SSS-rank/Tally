package com.sss.bank.domain.transfer.service;

import java.security.NoSuchAlgorithmException;
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

import com.sss.bank.api.password.service.PasswordRepository;
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
import com.sss.bank.global.error.exception.AccountException;
import com.sss.bank.global.error.exception.BusinessException;
import com.sss.bank.global.error.exception.MemberException;
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
	private final PasswordRepository passwordRepository;

	@Override
	public TransferDto.TransferDepositRespDto createTransfer(long memberId,
		TransferDto.TransferDepositReqDto transferDepositReqDto) throws NoSuchAlgorithmException {

		// 회원 확인
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);
		if (memberOptional.isEmpty())
			throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

		Member member = memberOptional.get();

		//출금 계좌 인증
		Optional<Account> senderAccountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
			transferDepositReqDto.getSenderAccountNum());
		if (senderAccountOptional.isEmpty())
			throw new AccountException(ErrorCode.INVALID_WITHDRAW_ACCOUNT);
		Account senderAccount = senderAccountOptional.get();

		// 출금 계좌 비밀번호 확인
		if (!passwordRepository.checkPassword(transferDepositReqDto.getSenderAccountNum(),
			transferDepositReqDto.getAccountPassword()))
			throw new AccountException(ErrorCode.INVALID_ACCOUNT_PASSWORD);

		//입금 계좌 인증
		Optional<Account> recAccountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
			transferDepositReqDto.getReceiverAccountNum());
		if (recAccountOptional.isEmpty())
			throw new AccountException(ErrorCode.INVALID_DEPOSIT_ACCOUNT);

		Account recAccount = recAccountOptional.get();

		// 출금계좌와 입금계좌가 동일하면 안됨
		if (transferDepositReqDto.getSenderAccountNum().equals(transferDepositReqDto.getReceiverAccountNum())) {
			throw new BusinessException(ErrorCode.DUPLICATE_ACCOUNT);
		}

		//출금계좌 소유주와 로그인한 사용자가 동일한지 확인
		if (senderAccount.getMemberId() != member) {
			throw new BusinessException(ErrorCode.UNAUTHORIZED_ACCESS);
		}

		//출금계좌 잔액 확인
		if (senderAccount.getBalance() < transferDepositReqDto.getDepositAmount()) {
			throw new BusinessException(ErrorCode.INSUFFICIENT_FUNDS);
		}

		//이체하기(계좌 잔액 조정)
		Long depositAmount = transferDepositReqDto.getDepositAmount();
		senderAccount.updateBalance(senderAccount.getBalance() - depositAmount);
		recAccount.updateBalance(recAccount.getBalance() + depositAmount);

		// 이체 내역 생성
		String Uuid = UUID.randomUUID().toString();
		transferRepository.save(
			Transfer.of(transferDepositReqDto, Uuid, senderAccount, recAccount));

		return TransferDto.TransferDepositRespDto.of(
			recAccount.getMemberId().getName(),
			depositAmount);

	}

	@Override
	public List<TransferDto.TransferListRespDto> getTransferList(long memberId,
		TransferDto.TransferListReqDto transferListReqDto) throws NoSuchAlgorithmException {

		// 회원 인증
		Optional<Member> memberOptional = memberRepository.findMemberByMemberId(memberId);
		if (memberOptional.isEmpty())
			throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

		Optional<Account> account = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
			transferListReqDto.getAccountNum());
		// 계좌 존재 인증 및 비밀번호 인증
		if (!passwordRepository.checkPassword(transferListReqDto.getAccountNum(),
			transferListReqDto.getAccountPassword()))
			throw new AccountException(ErrorCode.INVALID_ACCOUNT_PASSWORD);

		int page = transferListReqDto.getPage();
		int limit = transferListReqDto.getLimit();

		Pageable fixedPageable = PageRequest.of(page, limit, Sort.by("transferDate").descending());
		Page<Transfer> transferList = transferRepository.findTransfersByDepositAccountIdOrWithdrawAccountId(
			account.get(),
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
	}

	@Override
	public String oneTransfer(long memberId, TransferDto.OnetransferReqDto onetransferReqDto) throws
		NoSuchAlgorithmException {
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
			TransferDto.TransferDepositReqDto transferDepositReqDto = TransferDto.TransferDepositReqDto.of(
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
