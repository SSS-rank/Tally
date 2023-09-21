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
	private String accountNumber; // 계좌 번호

	@Column(nullable = false)
	private Boolean status; //삭제 여부

	@Column(nullable = false)
	private int orderNumber; // 계좌 등록 순서

	@Column(nullable = false)
	private String bankCode; // 은행 코드

	@Column(nullable = false)
	private Boolean representativeAccount; // 대표 계좌 여부

	@Column(nullable = false)
	private String accountPassword;

	@CreatedDate
	private LocalDateTime createDate;

	public static Account of(
		Member member, AccountDto.AccountCreateReqDto accountCreateReqDto, Boolean representativeAccount){
		return Account.builder()
			.memberId(member)
			.accountNumber(accountCreateReqDto.getAccountNumber())
			.status(false)
			.orderNumber(accountCreateReqDto.getOrderNumber())
			.bankCode(accountCreateReqDto.getBankCode())
			.representativeAccount(representativeAccount)
			.accountPassword(accountCreateReqDto.getAccountPassword())
			.build();
	}

	public void updateStatus(boolean status) {
		this.status = status;
	}

	public void updateRepresentative(Boolean representative){
		this.representativeAccount = representative;
	}
	public void updateOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
	}
}
