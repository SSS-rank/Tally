package com.sss.tally.domain.country.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
public class Country {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long countryId;

	@Column(nullable = false)
	private String countryCode;

	@Column(nullable = false)
	private String countryName;

	@Column(nullable = false)
	private String visa;

	private String language;

	private float timeDifference;

	private String capital;

	public static Country of(String countryCode, String countryName, String visa){
		return Country.builder()
			.countryCode(countryCode)
			.countryName(countryName)
			.visa(visa)
			.build();
	}
}