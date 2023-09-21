package com.sss.tally.domain.travel.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.member.dto.MemberDto;
import com.sss.tally.api.travel.dto.TravelDto;
import com.sss.tally.domain.city.entity.City;
import com.sss.tally.domain.city.repository.CityRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.domain.state.entity.State;
import com.sss.tally.domain.state.repository.StateRepository;
import com.sss.tally.domain.travel.entity.Travel;
import com.sss.tally.domain.travel.entity.TravelTypeEnum;
import com.sss.tally.domain.travel.repository.TravelRepository;
import com.sss.tally.domain.travelgroup.entity.TravelGroup;
import com.sss.tally.domain.travelgroup.repository.TravelGroupRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.BusinessException;
import com.sss.tally.global.error.exception.CityException;
import com.sss.tally.global.error.exception.MemberException;
import com.sss.tally.global.error.exception.TravelException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TravelServiceImpl implements TravelService{
	private final TravelRepository travelRepository;
	private final MemberRepository memberRepository;
	private final TravelGroupRepository travelGroupRepository;
	private final CityRepository cityRepository;
	private final StateRepository stateRepository;

	@Override
	public void createTravel(Authentication authentication, TravelDto.TravelCreateDto travelCreateDto) {
		Member member = (Member)authentication.getPrincipal();
		Optional<Member> memberOptional = memberRepository.findByMemberUuid(member.getMemberUuid());

		if(memberOptional.isEmpty()) throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

		TravelTypeEnum travelTypeEnum = null;
		switch (travelCreateDto.getTravelType()) {
			case "state":
				travelTypeEnum = TravelTypeEnum.STATE;
				break;
			case "city":
				travelTypeEnum = TravelTypeEnum.CITY;
				break;
			case "global":
				travelTypeEnum = TravelTypeEnum.GLOBAL;
				break;
			default:
				throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL_TYPE);
		}

		String[] start = travelCreateDto.getStartDate().split("-");
		LocalDate startLocalDate = LocalDate.of(Integer.parseInt(start[0]), Integer.parseInt(start[1]), Integer.parseInt(start[2]));
		String[] end = travelCreateDto.getEndDate().split("-");
		LocalDate endLocalDate = LocalDate.of(Integer.parseInt(end[0]), Integer.parseInt(end[1]), Integer.parseInt(end[2]));

		Travel travel = Travel.of(travelCreateDto, travelTypeEnum, startLocalDate, endLocalDate, false);
		Travel save = travelRepository.save(travel);
		travelGroupRepository.save(TravelGroup.of(memberOptional.get(), save));
	}

	@Override
	public List<TravelDto> getTravelList(Authentication authentication, String type, Pageable pageable) {
		// access token으로 사용자 정보 받기
		Member member = (Member)authentication.getPrincipal();
		Optional<Member> memberOptional = memberRepository.findByMemberUuid(member.getMemberUuid());
		if(memberOptional.isEmpty()) throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

		// before, after, ongoing에 맞는 여행지 리스트를 repository에서 받아옴
		List<Travel> travelList = new ArrayList<>();
		switch (type) {
			case "before":
				travelList = travelRepository.findUpcomingTravelForMember(memberOptional.get(), LocalDate.now(), pageable);
				break;
			case "ongoing":
				travelList = travelRepository.findOngoingTravelForMember(memberOptional.get(), LocalDate.now(), pageable);
				break;
			case "after":
				travelList = travelRepository.findPastTravelForMember(memberOptional.get(), LocalDate.now(), pageable);
				break;
		}

		// for문을 통해 Travel entity를 TravelDto로 변환
		List<TravelDto> travels = new ArrayList<>();
		for(Travel travel: travelList){
			String travelLocation = "";
			String travelType ="";

			// 여행지 정보를 받아옴
			// travelType은 국가 코드
			// travelLocation은 여행지 명
			if(travel.getTravelType().equals(TravelTypeEnum.CITY)){
				travelType="KOR";
				Optional<City> cityByCityId = cityRepository.findCityByCityId(travel.getTravelLocation());
				if(cityByCityId.isEmpty()) throw new CityException(ErrorCode.NOT_EXIST_CITY);
				travelLocation = cityByCityId.get().getCityName();
			}
			else if(travel.getTravelType().equals(TravelTypeEnum.STATE)){
				travelType="KOR";
				Optional<State> stateByStateId = stateRepository.findStateByStateId(travel.getTravelLocation());
				if(stateByStateId.isEmpty()) throw new CityException(ErrorCode.NOT_EXIST_STATE);
				travelLocation = stateByStateId.get().getStateName();
			}
			else if(travel.getTravelType().equals(TravelTypeEnum.GLOBAL)){
				// country 정보가 구현된 후, 수정 예정
			}

			// travelId를 통해 여행 참여자들의 정보를 받아옴.
			List<Member> members = memberRepository.findMembersInTravel(travel);

			// 사용자의 정보를 MembeTravelDto로 변환 및 travels에 추가
			travels.add(TravelDto.of(travel, travelType, travelLocation, members.stream()
				.map(MemberDto.MemberTravelDto::from)
				.collect(Collectors.toList())));
		}
		return travels;
	}

	@Override
	public int getDay(Authentication authentication) {
		Member auth = (Member)authentication.getPrincipal();
		Member member = memberRepository.findByMemberUuid(auth.getMemberUuid())
			.orElseThrow(()->new BusinessException(ErrorCode.NOT_EXIST_MEMBER));

		List<Travel> ongoingTravel = travelRepository.findOngoingTravelForMember(member, LocalDate.now(), null);
		if(ongoingTravel.size()>0) return 0;

		List<Travel> travelList = travelRepository.findUpcomingTravelForMemberOrderByTravelDate(member, LocalDate.now());
		if(travelList.isEmpty()) return -1;

		LocalDateTime travelStart = travelList.get(0).getStartDate().atStartOfDay();
		LocalDateTime now = LocalDate.now().atStartOfDay();
		return (int)Duration.between(travelStart, now).toDays() * -1;
	}
}
