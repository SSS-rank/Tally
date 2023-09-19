package com.sss.tally.domain.city.entity;

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

import com.sss.tally.domain.state.entity.State;

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
public class City {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cityId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "state_id")
	private State stateId;

	@Column(nullable = false)
	private String cityName;

	public static City of(String cityName, State stateId){
		return City.builder()
			.stateId(stateId)
			.cityName(cityName)
			.build();
	}

}