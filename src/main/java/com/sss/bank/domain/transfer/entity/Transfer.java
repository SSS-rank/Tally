package com.sss.bank.domain.transfer.entity;

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

import com.sss.bank.api.transfer.dto.TransferDto;
import com.sss.bank.domain.account.entity.Account;

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
public class Transfer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long transferId;

	@Column(nullable = false, unique = true)
	private String transferUuid;

	@JoinColumn(name = "sender")
	@ManyToOne(fetch = FetchType.LAZY)
	private Account sender;

	@JoinColumn(name = "receiver")
	@ManyToOne(fetch = FetchType.LAZY)
	private Account receiver;

	@Column(nullable = false)
	private Long amount;

	@CreatedDate
	@Column(nullable = false)
	private LocalDateTime transferDate;

	public static Transfer of(TransferDto.TransferDepositReqDto transferDepositReqDto, String uuid, Account sender,
		Account receiver) {
		return Transfer
			.builder()
			.transferUuid(uuid)
			.sender(sender)
			.receiver(receiver)
			.amount(transferDepositReqDto.getDepositAmount())
			.build();
	}
}
