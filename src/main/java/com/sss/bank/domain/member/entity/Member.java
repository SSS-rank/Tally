package com.sss.bank.domain.member.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.sss.bank.external.oauth.model.OAuthAttributes;

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
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberId;

	@Column(nullable = false, unique = true)
	private Long kakaoId;

	@Column(nullable = false)
	private String name;

	private String englishName;

	private String email;

	private LocalDateTime withdrawalDate;

	@CreatedDate
	private LocalDateTime createDate;

	public static Member from (OAuthAttributes userInfo){
		return Member.builder()
			.kakaoId(userInfo.getKakaoId())
			.email(userInfo.getEmail())
			.name(userInfo.getName())
			.build();
	}
}
