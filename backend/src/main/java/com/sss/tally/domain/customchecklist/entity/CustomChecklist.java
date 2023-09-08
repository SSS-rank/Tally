package com.sss.tally.domain.customchecklist.entity;

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

public class CustomChecklist {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long customChecklistId;

	@JoinColumn(name = "member_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Member memberId;

	private Long travelId;

	@Column(nullable = false)
	private String content;

	private Boolean status;
	@CreatedDate
	private LocalDateTime createDate;
}
