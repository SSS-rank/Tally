package com.sss.tally.domain.caculategroup.entity;

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
public class CalculateGroup {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long calculateGroupId;

	@Column(nullable = false)
	private Boolean status;

	@Column(nullable = false)
	private String calculateGroupUuid;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member memberId;

	public static CalculateGroup from(Boolean status) {
		return CalculateGroup.builder().status(status).build();
	}
}