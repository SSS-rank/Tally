package com.sss.tally.domain.defaultchecklist.entity;

import java.time.LocalDateTime;

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

import com.sss.tally.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@AllArgsConstructor
public class DefaultCheckList {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long defaultChecklistId;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member memberId;
	private String content;
	@CreatedDate
	private LocalDateTime createDate;

	public static DefaultCheckList of(Member member, String content) {
		return DefaultCheckList.builder()
			.memberId(member)
			.content(content)
			.build();
	}
}
