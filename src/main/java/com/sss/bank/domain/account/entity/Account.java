package com.sss.bank.domain.account.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.sss.bank.domain.bank.entity.Bank;
import com.sss.bank.domain.member.entity.Member;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long accountId;

	@Column(nullable = false, unique = true)
	private String accountUuid;

	@JoinColumn(name = "member_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Member memberId;

	@JoinColumn(name = "bank_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Bank bankId;

	@Column(nullable = false, unique = true)
	private String accountNumber;

	@Column(nullable = false)
	private Long balance;

	@Column(nullable = false)
	private Boolean status;

	@Column(nullable = false)
	private String password;

	private String salt;

	@CreatedDate
	private LocalDateTime createDate;

	public static Account of(Member member, String salt,
		String password,
		String accountNum, String uuid, Bank bank) {
		return Account.builder()
			.accountUuid(uuid)
			.accountNumber(accountNum)
			.balance(1000000L)
			.salt(salt)
			.password(password)
			.memberId(member)
			.status(false)
			.bankId(bank)
			.build();
	}

	public void updateBalance(Long balance) {
		this.balance = balance;
	}

	public void updateStatus(boolean changeStatus) {
		this.status = changeStatus;
	}

}
