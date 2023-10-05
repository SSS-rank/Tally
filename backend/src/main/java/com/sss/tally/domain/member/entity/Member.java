package com.sss.tally.domain.member.entity;

import java.time.LocalDateTime;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.sss.tally.external.model.OAuthAttributes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Builder
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@ToString
public class Member implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberId;

	@Column(nullable = false, unique = true)
	private String memberUuid;

	@Column(nullable = false, unique = true)
	private Long kakaoId;

	@Column(nullable = false)
	private String nickname;

	private String transferPassword;

	private String transferSalt;

	@Column(nullable = false)
	private String profileImage;

	@CreatedDate
	private LocalDateTime createDate;

	private LocalDateTime withdrawalDate;

	public static Member of(String memberUuid, OAuthAttributes userInfo) {
		return Member.builder()
			.memberUuid(memberUuid)
			.kakaoId(userInfo.getKakaoId())
			.nickname(userInfo.getNickname())
			.profileImage(userInfo.getProfileImageUrl())
			.build();
	}

	public void withdrawal(LocalDateTime localDateTime){
		this.withdrawalDate = localDateTime;
	}

	public void patchMemberInfo(String nickname, String profileImage){
		this.nickname = nickname;
		this.profileImage = profileImage;
	}

	public void createPassword(String transferPassword, String transferSalt){
		this.transferPassword = transferPassword;
		this.transferSalt = transferSalt;
	}

	public void patchPassword(String transferPassword){
		this.transferPassword = transferPassword;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return false;
	}
}
