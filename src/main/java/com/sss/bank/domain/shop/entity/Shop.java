package com.sss.bank.domain.shop.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Shop {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long shopId;

	@Column(nullable = false)
	private String shopType;

	@Column(nullable = false)
	private String shopName;
}
