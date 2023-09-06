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

	@Column(nullable = false, unique = true)
	private String accountNumber;

	@Column(nullable = false)
	private Long balance;

	@Column(nullable = false)
	private Boolean status;

	@CreatedDate
	private LocalDateTime createDate;

	public void deposit(Long amount) {
		this.balance += amount;
	}

	// 출금 메서드
	public void withdraw(Long amount) {
		this.balance -= amount;
	}
}
