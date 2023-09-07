package com.sss.tally.domain.account.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedDate;

import com.sss.tally.domain.member.entity.Member;

public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long accountId;

	@JoinColumn(name = "member_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Member memberId;

	@Column(nullable = false, unique = true)
	private String accountNumber;

	@Column(nullable = false)
	private Boolean status;

	@Column(nullable = false)
	private int order;

	@Column(nullable = false)
	private Boolean representativeAccount;

	@CreatedDate
	private LocalDateTime createDate;
}
