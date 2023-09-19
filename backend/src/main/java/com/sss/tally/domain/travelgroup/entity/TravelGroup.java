package com.sss.tally.domain.travelgroup.entity;

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
import com.sss.tally.domain.travel.entity.Travel;

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
public class TravelGroup {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long travelGroupId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member memberId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "travel_id")
	private Travel travelId;

	public static TravelGroup of(Member member, Travel travel){
		return TravelGroup.builder()
			.memberId(member)
			.travelId(travel)
			.build();
	}

}