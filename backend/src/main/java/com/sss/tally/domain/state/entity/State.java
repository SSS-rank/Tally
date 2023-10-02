package com.sss.tally.domain.state.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.sss.tally.api.destination.dto.DestinationDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Getter
@Builder
@ToString
public class State {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long stateId;

	@Column(nullable = false, unique = true)
	private String stateName;

	private String englishName;
	public static State from(DestinationDto.StateCityRespDto state){
		return State.builder()
			.stateName(state.getName())
			.build();
	}

}