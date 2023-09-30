package com.sss.bank.domain.transfer.service;

import java.math.BigInteger;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

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
import com.sss.bank.global.error.exception.BankException;
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
		// 은행 코드 검증
		Optional<Bank> bankOptional = bankRepository.findBankByBankCode(transferDepositReqDto.getBankCode());
		if (bankOptional.isEmpty()) {
			throw new BankException(ErrorCode.NOT_EXIST_BANK);
		}
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

		Optional<Account> accountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
			transferListReqDto.getAccountNum());
		if(accountOptional.isEmpty()){
			throw new AccountException(ErrorCode.INVALID_ACCOUNT_NUMBER);
		}
		int page = transferListReqDto.getPage();
		int limit = transferListReqDto.getLimit();
		Account account = accountOptional.get();
		long accountId = account.getAccountId();

		List<Map<String, Object>> Results = transferRepository.findTransferPaymentList(accountId, limit, page);

		List<TransferDto.TransferListRespDto> transferListRespDtos = new ArrayList<>();

		for (Map<String, Object> rawResult : Results) {
			Object accountIdObj = rawResult.get("accountId");
			Object receiverObj = rawResult.get("receiver");

			// 보내는 자일 때 (출금)
			if (accountIdObj != null && ((BigInteger)accountIdObj).longValue() == accountId) {
				Integer value = (Integer)rawResult.get("shopType");
				if (value == null) {
					value = 7;  // 기본값 설정
				}
				java.sql.Timestamp timestamp = (java.sql.Timestamp)rawResult.get("date");
				LocalDateTime localDateTime = timestamp.toLocalDateTime();
				TransferDto.TransferListRespDto dto = TransferDto.TransferListRespDto.of(
					localDateTime,
					"출금",
					(String)rawResult.get("withdrawAccountContent"),
					((BigInteger)rawResult.get("amount")).longValue(),
					(String)rawResult.get("uuid"),
					value
				);
				transferListRespDtos.add(dto);
			}

			// 받는 자일 때 (입금)
			if (receiverObj != null && ((BigInteger)receiverObj).longValue() == accountId) {
				Integer value = (Integer)rawResult.get("shopType");
				if (value == null) {
					value = 7;  // 기본값 설정
				}
				java.sql.Timestamp timestamp = (java.sql.Timestamp)rawResult.get("date");
				LocalDateTime localDateTime = timestamp.toLocalDateTime();
				TransferDto.TransferListRespDto dto = TransferDto.TransferListRespDto.of(
					localDateTime,
					"입금",
					(String)rawResult.get("name"),
					((BigInteger)rawResult.get("amount")).longValue(),
					(String)rawResult.get("uuid"),
					value
				);
				transferListRespDtos.add(dto);
			}
		}

		return transferListRespDtos;
	}

	@Override
	public String oneTransfer(TransferDto.OnetransferReqDto onetransferReqDto) throws
		NoSuchAlgorithmException {

		// 계좌 검증
		Optional<Account> accountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
			onetransferReqDto.getAccountNum());
		if (accountOptional.isEmpty()) {
			throw new AccountException(ErrorCode.NOT_EXIST_ACCOUNT);
		}

		// 은행 코드 검증
		Optional<Bank> bankOptional = bankRepository.findBankByBankCode(onetransferReqDto.getBankCode());
		if (bankOptional.isEmpty()) {
			throw new BankException(ErrorCode.NOT_EXIST_BANK);
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
			, onetransferReqDto.getBankCode());
		createOneTransfer(5, transferDepositReqDto);
		redisService.setOneTrnasferValues(String.valueOf(onetransferReqDto.getAccountNum()), depositAccountContent);

		return depositAccountContent;

	}

	@Override
	public String oneTransferVerify(TransferDto.OnetransferVerifyReqDto onetransferVerifyReqDto) {

		// 1원 이체 예금주 검증
		String redisCode = redisService.getValues(String.valueOf(onetransferVerifyReqDto.getAccountNum()));
		if (redisCode == null) {
			throw new AccountException(ErrorCode.EXPIRE_ONE_VALUE);
		}
		if (onetransferVerifyReqDto.getCode().equals(redisCode)) {
			Optional<Account> accountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
				onetransferVerifyReqDto.getAccountNum());
			if (accountOptional.isEmpty()) {
				throw new AccountException(ErrorCode.INVALID_ACCOUNT_NUMBER);
			}
			Account account = accountOptional.get();
			return account.getPassword();
		} else {
			throw new AccountException(ErrorCode.INVALID_ONE_VALUE);
		}

	}

	@Override
	public TransferDto.TransferDepositRespDto createTransferTally(
		TransferDto.TransferDepositReqDto transferDepositReqDto) throws NoSuchAlgorithmException {

		Optional<Bank> bankOptional = bankRepository.findBankByBankCode(transferDepositReqDto.getBankCode());
		if (bankOptional.isEmpty()) {
			throw new BankException(ErrorCode.NOT_EXIST_BANK);
		}

		//출금 계좌 인증
		Optional<Account> senderAccountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
			transferDepositReqDto.getSenderAccountNum());
		if (senderAccountOptional.isEmpty())
			throw new AccountException(ErrorCode.INVALID_WITHDRAW_ACCOUNT);
		Account senderAccount = senderAccountOptional.get();

		// 출금 계좌 비밀번호 확인
		if (!passwordRepository.checkPasswordTally(transferDepositReqDto.getSenderAccountNum(),
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
	public List<TransferDto.TransferListRespDto> getTransferListTally(
		TransferDto.TransferListReqTallyDto transferListReqDto) throws NoSuchAlgorithmException {

		Optional<Account> accountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
			transferListReqDto.getAccountNum());
		if(accountOptional.isEmpty()){
			throw new AccountException(ErrorCode.INVALID_ACCOUNT_NUMBER);
		}
		Account account = accountOptional.get();
		long accountId = account.getAccountId();

		List<Map<String, Object>> Results = transferRepository.findTransferPaymentList(accountId,
			transferListReqDto.getStartDate(), transferListReqDto.getEndDate());
		List<TransferDto.TransferListRespDto> transferListRespDtos = new ArrayList<>();

		for (Map<String, Object> rawResult : Results) {
			Object accountIdObj = rawResult.get("accountId");
			Object receiverObj = rawResult.get("receiver");
			//보내는 자일 때 (출금)
			if (accountIdObj != null && ((BigInteger)accountIdObj).longValue() == accountId) {
				Integer value = (Integer)rawResult.get("shopType");
				if (value == null) {
					value = 7;  // 기본값 설정
				}
				java.sql.Timestamp timestamp = (java.sql.Timestamp)rawResult.get("date");
				LocalDateTime localDateTime = timestamp.toLocalDateTime();
				TransferDto.TransferListRespDto dto = TransferDto.TransferListRespDto.of(
					localDateTime
					, "출금", (String)rawResult.get("withdrawAccountContent"),
					((BigInteger)rawResult.get("amount")).longValue(), (String)rawResult.get("uuid")
					, value);

				transferListRespDtos.add(dto);
			}
			//받는 자일 때 (입금)
			if (receiverObj != null && ((BigInteger)receiverObj).longValue() == accountId) {
				Integer value = (Integer)rawResult.get("shopType");
				if (value == null) {
					value = 7;  // 기본값 설정
				}

				java.sql.Timestamp timestamp = (java.sql.Timestamp)rawResult.get("date");
				LocalDateTime localDateTime = timestamp.toLocalDateTime();
				TransferDto.TransferListRespDto dto = TransferDto.TransferListRespDto.of(
					localDateTime
					, "입금", (String)rawResult.get("name"),
					((BigInteger)rawResult.get("amount")).longValue(), (String)rawResult.get("uuid")
					, value);

				transferListRespDtos.add(dto);
			}

		}

		return transferListRespDtos;
	}

	public TransferDto.TransferDepositRespDto createOneTransfer(long memberId,
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

		Optional<Account> recAccountOptional = accountRepository.findAccountByAccountNumberAndStatusIsFalse(
			transferDepositReqDto.getReceiverAccountNum());
		Account recAccount = recAccountOptional.get();

		// 출금계좌와 입금계좌가 동일하면 안됨
		if (transferDepositReqDto.getSenderAccountNum().equals(transferDepositReqDto.getReceiverAccountNum())) {
			throw new BusinessException(ErrorCode.DUPLICATE_ACCOUNT);
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
}
