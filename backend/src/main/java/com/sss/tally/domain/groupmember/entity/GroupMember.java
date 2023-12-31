package com.sss.tally.domain.groupmember.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.sss.tally.domain.caculategroup.entity.CalculateGroup;
import com.sss.tally.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Getter
@Builder
public class GroupMember {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long groupMemberId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member memberId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "calculate_group_id")
	private CalculateGroup calculateGroupId;

	@Column(nullable = false)
	private Boolean status;

	private String accountNumber;

	public static GroupMember of(Member member, CalculateGroup calculateGroup, Boolean status) {
		return GroupMember.builder()
			.calculateGroupId(calculateGroup)
			.memberId(member)
			.status(status)
			.build();
	}

	public void updateStatus(Boolean status) {
		this.status = status;
	}

	public void updateAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

}