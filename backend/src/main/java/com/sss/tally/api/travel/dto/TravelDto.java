package com.sss.tally.api.travel.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.api.member.dto.MemberDto;
import com.sss.tally.domain.travel.entity.Travel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TravelDto {
	private String travelTitle;
	private String travelLocation;
	private String travelType;
	private List<MemberDto.MemberTravelDto> travelParticipants;
	private LocalDate startDate;
	private LocalDate endDate;

	public static TravelDto of(Travel travel, String travelLocation, String travelType, List<MemberDto.MemberTravelDto> members){
		return TravelDto.builder()
			.travelTitle(travel.getTravelTitle())
			.startDate(travel.getStartDate())
			.endDate(travel.getEndDate())
			.travelParticipants(members)
			.travelLocation(travelLocation)
			.travelType(travelType)
			.build();
	}


	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class TravelCreateDto{
		private String travelTitle;
		private Long travelLocation;
		private String travelType;
		private String startDate;
		private String endDate;
	}
}
