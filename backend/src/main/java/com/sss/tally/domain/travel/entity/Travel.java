package com.sss.tally.domain.travel.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.sss.tally.api.travel.dto.TravelDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Builder
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class Travel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long travelId;

	@Column(nullable = false)
	private String travelTitle;

	@Column(nullable = false)
	private LocalDate startDate;

	@Column(nullable = false)
	private LocalDate endDate;

	@Column(nullable = false)
	private Boolean status;

	@CreatedDate
	@Column(nullable = false)
	private LocalDateTime createDate;

	@Column(nullable = false)
	private long travelLocation;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TravelTypeEnum travelType;

	public static Travel of(TravelDto.TravelCreateDto travelCreateDto, TravelTypeEnum typeEnum, LocalDate start, LocalDate end, Boolean status){
		return Travel.builder()
			.travelTitle(travelCreateDto.getTravelTitle())
			.travelType(typeEnum)
			.travelLocation(travelCreateDto.getTravelLocation())
			.startDate(start)
			.endDate(end)
			.status(status)
			.build();
	}

}
