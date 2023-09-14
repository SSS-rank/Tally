package com.sss.tally.domain.account.entity;

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

import com.sss.tally.api.account.dto.AccountDto;
import com.sss.tally.domain.member.entity.Member;

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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member memberId;

	@Column(nullable = false, unique = true)
	private String accountNumber;

	@Column(nullable = false)
	private Boolean status;

	@Column(nullable = false)
	private int orderNumber;

	@Column(nullable = false)
	private String bankName;

	@Column(nullable = false)
	private Boolean representativeAccount;

	@CreatedDate
	private LocalDateTime createDate;

	public static Account from(AccountDto.AccountCreateReqDto accountCreateReqDto){
		return Account.builder()
			.accountNumber(accountCreateReqDto.getAccountNumber())
			.build();
	}

	private void updateStatus(boolean status) {
		this.status = status;
	}

	private void updateOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
	}
}
