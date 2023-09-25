package com.sss.tally.api.travel.dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.sss.tally.api.member.dto.MemberDto;
import com.sss.tally.api.payment.dto.PaymentDto;
import com.sss.tally.domain.member.entity.Member;
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
	private Long travelId;
	private String travelTitle;
	private String travelLocation;
	private String travelType;
	private List<MemberDto.MemberTravelDto> travelParticipants;
	private LocalDate startDate;
	private LocalDate endDate;

	public static TravelDto of(Travel travel, String travelLocation, String travelType, List<MemberDto.MemberTravelDto> members){
		return TravelDto.builder()
			.travelId(travel.getTravelId())
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
	public static class TravelNotStartDto {
		private String travelTitle;
		private String travelLocation;
		private String travelType;
		private LocalDate startDate;
		private LocalDate endDate;
		private int remainDate;
		private List<MemberDto.MemberTravelDto> travelParticipants;
		private Long money;

		public static TravelNotStartDto of(Long money, int remainDate, Travel travel, String travelLocation, String travelType, List<MemberDto.MemberTravelDto> members){
			return TravelNotStartDto.builder()
				.travelTitle(travel.getTravelTitle())
				.travelLocation(travelLocation)
				.travelType(travelType)
				.startDate(travel.getStartDate())
				.endDate(travel.getEndDate())
				.remainDate(remainDate)
				.travelParticipants(members)
				.money(money)
				.build();
		}
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class TravelVisibleReqDto{
		private boolean visible;
		private Long travelId;
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	public static class TravelVisitRespDto{
		private int global;
		private int national;

		public static TravelVisitRespDto of(int national, int global){
			return TravelVisitRespDto.builder()
				.global(global)
				.national(national)
				.build();
		}
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


	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class TravelCreateRespDto{
		private Long travelId;
		private String travelTitle;
		private String travelLocation;
		private String travelType;
		private String profileImage;
		private String profileNickname;
		private String memberUuid;
		private LocalDate startDate;
		private LocalDate endDate;

		public static TravelCreateRespDto of(Travel travel, String travelLocation, String travelType, Member member){
			return TravelCreateRespDto.builder()
				.travelId(travel.getTravelId())
				.travelTitle(travel.getTravelTitle())
				.startDate(travel.getStartDate())
				.endDate(travel.getEndDate())
				.profileImage(member.getProfileImage())
				.profileNickname(member.getNickname())
				.memberUuid(member.getMemberUuid())
				.travelLocation(travelLocation)
				.travelType(travelType)
				.build();
		}
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class TravelDetailDto {
		private Long travelId;
		private String travelTitle;
		private String travelLocation;
		private String travelPeriod;

		private Long totalAmount;

		private List<MemberDto.MemberTravelDto> participants;

		private List<PaymentDto.PaymentListDto> paymentList;

		public static TravelDetailDto of(Travel travel, List<PaymentDto.PaymentListDto> paymentListDtos, Long totalAmount, String travelLocation, List<MemberDto.MemberTravelDto> memberTravelDtos){
			DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
			String dateStart = travel.getStartDate().format(dateTimeFormatter);
			String dateEnd = travel.getEndDate().format(dateTimeFormatter);
			return TravelDetailDto.builder()
				.totalAmount(totalAmount)
				.travelTitle(travel.getTravelTitle())
				.travelId(travel.getTravelId())
				.travelPeriod(dateStart+"~"+dateEnd)
				.travelLocation(travelLocation)
				.paymentList(paymentListDtos)
				.participants(memberTravelDtos)
				.build();
		}
	}
}
