package com.sss.tally.domain.travel.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.member.dto.MemberDto;
import com.sss.tally.api.payment.dto.PaymentDto;
import com.sss.tally.api.travel.dto.TravelDto;
import com.sss.tally.domain.account.entity.Account;
import com.sss.tally.domain.account.repository.AccountRepository;
import com.sss.tally.domain.category.entity.Category;
import com.sss.tally.domain.category.repository.CategoryRepository;
import com.sss.tally.domain.city.entity.City;
import com.sss.tally.domain.city.repository.CityRepository;
import com.sss.tally.domain.country.entity.Country;
import com.sss.tally.domain.country.repository.CountryRepository;
import com.sss.tally.domain.customchecklist.service.CustomCheckListService;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.domain.memberpayment.entity.MemberPayment;
import com.sss.tally.domain.memberpayment.repository.MemberPaymentRepository;
import com.sss.tally.domain.payment.client.PaymentClient;
import com.sss.tally.domain.payment.entity.Payment;
import com.sss.tally.domain.payment.repository.PaymentRepository;
import com.sss.tally.domain.paymentunit.entity.PaymentUnit;
import com.sss.tally.domain.paymentunit.repository.PaymentUnitRepository;
import com.sss.tally.domain.state.entity.State;
import com.sss.tally.domain.state.repository.StateRepository;
import com.sss.tally.domain.travel.entity.Travel;
import com.sss.tally.domain.travel.entity.TravelTypeEnum;
import com.sss.tally.domain.travel.repository.TravelRepository;
import com.sss.tally.domain.travelgroup.entity.TravelGroup;
import com.sss.tally.domain.travelgroup.repository.TravelGroupRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.BusinessException;
import com.sss.tally.global.error.exception.CategoryException;
import com.sss.tally.global.error.exception.CityException;
import com.sss.tally.global.error.exception.MemberException;
import com.sss.tally.global.error.exception.PaymentException;
import com.sss.tally.global.error.exception.TravelException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TravelServiceImpl implements TravelService {
	private final TravelRepository travelRepository;
	private final MemberRepository memberRepository;
	private final TravelGroupRepository travelGroupRepository;
	private final CityRepository cityRepository;
	private final StateRepository stateRepository;
	private final PaymentRepository paymentRepository;
	private final AccountRepository accountRepository;
	private final CountryRepository countryRepository;
	private final PaymentClient paymentClient;
	private final CategoryRepository categoryRepository;
	private final MemberPaymentRepository memberPaymentRepository;
	private final PaymentUnitRepository paymentUnitRepository;
	private final CustomCheckListService customCheckListService;

	@Override
	public TravelDto.TravelCreateRespDto createTravel(Authentication authentication,
		TravelDto.TravelCreateDto travelCreateDto) {
		Member member = (Member)authentication.getPrincipal();
		Optional<Member> memberOptional = memberRepository.findByMemberUuid(member.getMemberUuid());

		if (memberOptional.isEmpty())
			throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

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
		LocalDate startLocalDate = LocalDate.of(Integer.parseInt(start[0]), Integer.parseInt(start[1]),
			Integer.parseInt(start[2]));
		String[] end = travelCreateDto.getEndDate().split("-");
		LocalDate endLocalDate = LocalDate.of(Integer.parseInt(end[0]), Integer.parseInt(end[1]), Integer.parseInt(end[2]));
		if(startLocalDate.isAfter(endLocalDate)) throw new TravelException(ErrorCode.VALID_DATE_TIME);
		LocalDate endLocalDate = LocalDate.of(Integer.parseInt(end[0]), Integer.parseInt(end[1]),
			Integer.parseInt(end[2]));

		Travel travel = Travel.of(travelCreateDto, travelTypeEnum, startLocalDate, endLocalDate, false);
		Travel save = travelRepository.save(travel);

		String travelLocation = "";
		String travelType = "";

		// 여행지 정보를 받아옴
		// travelType은 국가 코드
		// travelLocation은 여행지 명
		if (travel.getTravelType().equals(TravelTypeEnum.CITY)) {
			travelType = "KOR";
			Optional<City> cityByCityId = cityRepository.findCityByCityId(travel.getTravelLocation());
			if (cityByCityId.isEmpty())
				throw new CityException(ErrorCode.NOT_EXIST_CITY);
			travelLocation = cityByCityId.get().getCityName();
		} else if (travel.getTravelType().equals(TravelTypeEnum.STATE)) {
			travelType = "KOR";
			Optional<State> stateByStateId = stateRepository.findStateByStateId(travel.getTravelLocation());
			if (stateByStateId.isEmpty())
				throw new CityException(ErrorCode.NOT_EXIST_STATE);
			travelLocation = stateByStateId.get().getStateName();
		} else if (travel.getTravelType().equals(TravelTypeEnum.GLOBAL)) {
			Optional<Country> countryByCountryId = countryRepository.findCountryByCountryId(travel.getTravelLocation());
			if (countryByCountryId.isEmpty())
				throw new CityException(ErrorCode.NOT_EXIST_COUNTRY);
			travelType = countryByCountryId.get().getCountryCode();
			travelLocation = countryByCountryId.get().getCountryName();
		}

		travelGroupRepository.save(TravelGroup.of(memberOptional.get(), save));
		customCheckListService.createInitCustomCheckList(memberOptional.get(), save);
		return TravelDto.TravelCreateRespDto.of(save, travelType, travelLocation, memberOptional.get());
	}

	@Override
	public List<TravelDto> getTravelList(Authentication authentication, String type, Pageable pageable) {
		// access token으로 사용자 정보 받기
		Member member = (Member)authentication.getPrincipal();
		Optional<Member> memberOptional = memberRepository.findByMemberUuid(member.getMemberUuid());
		if (memberOptional.isEmpty())
			throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

		// before, after, ongoing에 맞는 여행지 리스트를 repository에서 받아옴
		List<Travel> travelList = new ArrayList<>();
		switch (type) {
			case "before":
				travelList = travelRepository.findUpcomingTravelForMember(memberOptional.get(), LocalDate.now(),
					pageable);
				break;
			case "ongoing":
				travelList = travelRepository.findOngoingTravelForMember(memberOptional.get(), LocalDate.now(),
					pageable);
				break;
			case "after":
				travelList = travelRepository.findPastTravelForMember(memberOptional.get(), LocalDate.now(), pageable);
				break;
		}

		// for문을 통해 Travel entity를 TravelDto로 변환
		List<TravelDto> travels = new ArrayList<>();
		for (Travel travel : travelList) {
			String travelLocation = "";
			String travelType = "";

			if(travel.getTravelType().equals(TravelTypeEnum.CITY)){
				travelType="KOR";
				Optional<City> cityByCityId = cityRepository.findCityByCityId(travel.getTravelLocation());
				if (cityByCityId.isEmpty())
					throw new CityException(ErrorCode.NOT_EXIST_CITY);
				travelLocation = cityByCityId.get().getCityName();
			} else if (travel.getTravelType().equals(TravelTypeEnum.STATE)) {
				travelType = "KOR";
				Optional<State> stateByStateId = stateRepository.findStateByStateId(travel.getTravelLocation());
				if (stateByStateId.isEmpty())
					throw new CityException(ErrorCode.NOT_EXIST_STATE);
				travelLocation = stateByStateId.get().getStateName();
			} else if (travel.getTravelType().equals(TravelTypeEnum.GLOBAL)) {
				Optional<Country> countryByCountryId = countryRepository.findCountryByCountryId(
					travel.getTravelLocation());
				if (countryByCountryId.isEmpty())
					throw new CityException(ErrorCode.NOT_EXIST_COUNTRY);
				travelType = countryByCountryId.get().getCountryCode();
				travelLocation = countryByCountryId.get().getCountryName();
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
	public List<TravelDto.TravelNotStartDto> getNotStartTravel(Authentication authentication) {
		Member auth = (Member)authentication.getPrincipal();
		Member member = memberRepository.findByMemberUuid(auth.getMemberUuid())
			.orElseThrow(() -> new BusinessException(ErrorCode.NOT_EXIST_MEMBER));

		List<Travel> travelList = travelRepository.findUpcomingTravelForMemberOrderByTravelDate(member,
			LocalDate.now());
		if (travelList.isEmpty())
			return null;

		// for문을 통해 Travel entity를 TravelDto로 변환
		List<TravelDto.TravelNotStartDto> travelsInfo = new ArrayList<>();
		for (Travel travel : travelList) {
			String travelLocation = "";
			String travelType = "";

			LocalDateTime travelStart = travel.getStartDate().atStartOfDay();
			LocalDateTime now = LocalDate.now().atStartOfDay();
			int remainDate = (int)Duration.between(travelStart, now).toDays() * -1;
			// 여행지 정보를 받아옴
			// travelType은 국가 코드
			// travelLocation은 여행지 명
			if (travel.getTravelType().equals(TravelTypeEnum.CITY)) {
				travelType = "KOR";
				Optional<City> cityByCityId = cityRepository.findCityByCityId(travel.getTravelLocation());
				if (cityByCityId.isEmpty())
					throw new CityException(ErrorCode.NOT_EXIST_CITY);
				travelLocation = cityByCityId.get().getCityName();
			} else if (travel.getTravelType().equals(TravelTypeEnum.STATE)) {
				travelType = "KOR";
				Optional<State> stateByStateId = stateRepository.findStateByStateId(travel.getTravelLocation());
				if (stateByStateId.isEmpty())
					throw new CityException(ErrorCode.NOT_EXIST_STATE);
				travelLocation = stateByStateId.get().getStateName();
			} else if (travel.getTravelType().equals(TravelTypeEnum.GLOBAL)) {
				Optional<Country> countryByCountryId = countryRepository.findCountryByCountryId(
					travel.getTravelLocation());
				if (countryByCountryId.isEmpty())
					throw new CityException(ErrorCode.NOT_EXIST_COUNTRY);
				travelType = countryByCountryId.get().getCountryCode();
				travelLocation = countryByCountryId.get().getCountryName();
			}

			// travelId를 통해 여행 참여자들의 정보를 받아옴.
			List<Member> members = memberRepository.findMembersInTravel(travel);

			Long totalAmount = this.totalTravelMoney(member, members, travel);

			// 사용자의 정보를 MembeTravelDto로 변환 및 travelsInfo에 추가
			travelsInfo.add(TravelDto.TravelNotStartDto.of(totalAmount, remainDate, travel, travelType, travelLocation,
				members.stream()
					.map(MemberDto.MemberTravelDto::from)
					.collect(Collectors.toList())));
		}
		return travelsInfo;
	}

	@Override
	public TravelDto.TravelDetailDto getTravelDetail(Authentication authentication, Long travelId) {
		Member member = (Member)authentication.getPrincipal();

		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(travelId);
		if (travelOptional.isEmpty())
			throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);

		List<Account> memberAccounts = accountRepository.findAllByMemberIdAndStatusIsFalseOrderByOrderNumberAsc(
			member);

		for (Account account : memberAccounts) {
			String contentType = "application/x-www-form-urlencoded;charset=utf-8";
			PaymentDto.PaymentListReqDto from = PaymentDto.PaymentListReqDto.from(account.getAccountNumber(),
				account.getAccountPassword(), travelOptional.get().getStartDate().toString(),
				travelOptional.get().getEndDate().toString());
			PaymentDto.PaymentResDto paymentListRespDtos = paymentClient.requestTransferList(contentType, from);
			for (PaymentDto.PaymentListRespDto paymentListRespDto : paymentListRespDtos.getTranferList()) {

				if (paymentListRespDto.getFlag().equals("입금"))
					continue;

				Optional<Payment> payment = paymentRepository.findPaymentByPaymentUuid(
					paymentListRespDto.getTransferUuid());

				Optional<Category> category = categoryRepository.findCategoryByCategoryId(
					Long.parseLong(paymentListRespDto.getShopType() + ""));
				if (category.isEmpty())
					throw new CategoryException(ErrorCode.NOT_EXIST_CATEGORY);

				Optional<PaymentUnit> paymentUnitOptional = paymentUnitRepository.findPaymentUnitByPaymentUnitId(8L);
				if (paymentUnitOptional.isEmpty())
					throw new PaymentException(ErrorCode.NOT_EXIST_PAYMENT_UNIT);

				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");
				LocalDateTime dateTime = LocalDateTime.parse(paymentListRespDto.getTransferDate(), formatter);

				if (payment.isEmpty()) {
					Payment save = paymentRepository.save(
						Payment.of(paymentListRespDto, member, travelOptional.get(), category.get(),
							paymentUnitOptional.get(), dateTime));

					List<Long> memberIds = travelGroupRepository.findMemberIdsByTravelId(
						travelOptional.get().getTravelId());
					for (Long memberId : memberIds) {
						Optional<Member> optionalMember = memberRepository.findMemberByMemberId(memberId);
						if (optionalMember.isEmpty())
							throw new MemberException(ErrorCode.NOT_EXIST_MEMBER);

						if (optionalMember.get().getMemberUuid().equals(member.getMemberUuid()))
							memberPaymentRepository.save(
								MemberPayment.from(optionalMember.get(), save, false, save.getAmount()));
						else
							memberPaymentRepository.save(MemberPayment.from(optionalMember.get(), save, true, 0L));

					}
				}
			}

		}

		List<Payment> payments = paymentRepository.findPaymentsByTravelIdAndMemberId(travelOptional.get(), member);
		Long[] totalAmount = {0L};
		List<PaymentDto.PaymentListDto> paymentListDtos = payments.stream()
			.map(
				payment -> {
					List<String> memberPayments = memberPaymentRepository.findNicknamesByPaymentId(
						payment.getPaymentId());
					Optional<MemberPayment> memberPaymentOptional = memberPaymentRepository.findMemberPaymentByPaymentIdAndMemberIdAndStatusIsFalse(
						payment, member);
					memberPayments.remove(member.getNickname());
					totalAmount[0]+=memberPaymentOptional.get().getAmount();
					return PaymentDto.PaymentListDto.of(payment, memberPayments, memberPaymentOptional.get().getAmount());
				})
			.collect(Collectors.toList());

		String travelLocation = "";

		if (travelOptional.get().getTravelType().equals(TravelTypeEnum.CITY)) {
			Optional<City> cityByCityId = cityRepository.findCityByCityId(travelOptional.get().getTravelLocation());
			if (cityByCityId.isEmpty())
				throw new CityException(ErrorCode.NOT_EXIST_CITY);
			travelLocation = cityByCityId.get().getCityName();
		} else if (travelOptional.get().getTravelType().equals(TravelTypeEnum.STATE)) {
			Optional<State> stateByStateId = stateRepository.findStateByStateId(
				travelOptional.get().getTravelLocation());
			if (stateByStateId.isEmpty())
				throw new CityException(ErrorCode.NOT_EXIST_STATE);
			travelLocation = stateByStateId.get().getStateName();
		} else if (travelOptional.get().getTravelType().equals(TravelTypeEnum.GLOBAL)) {
			Optional<Country> countryByCountryId = countryRepository.findCountryByCountryId(
				travelOptional.get().getTravelLocation());
			if (countryByCountryId.isEmpty())
				throw new CityException(ErrorCode.NOT_EXIST_COUNTRY);
			travelLocation = countryByCountryId.get().getCountryName();
		}

		List<Member> membersByTravelId = travelGroupRepository.findMembersByTravelId(
			travelOptional.get().getTravelId());

		return TravelDto.TravelDetailDto.of(travelOptional.get(), paymentListDtos, totalAmount[0], travelLocation,
			membersByTravelId.stream()
				.map(MemberDto.MemberTravelDto::from)
				.collect(Collectors.toList()));
	}

	@Override
	public Long totalTravelMoney(Member user, List<Member> members, Travel travel) {
		Long totalAmount = 0L;
		for (Member member : members) {
			List<Payment> payments;
			if (member.equals(user))
				payments = paymentRepository.findAllByTravelIdAndMemberIdAndStatusIsFalse(travel, member);
			else
				payments = paymentRepository.findAllByTravelIdAndMemberIdAndStatusIsFalseAndVisibleIsTrue(travel,
					member);

			for (Payment payment : payments) {
				Optional<MemberPayment> memberPayment = memberPaymentRepository.findMemberPaymentByPaymentIdAndMemberIdAndStatusIsFalse(
					payment, user);
				if (memberPayment.isEmpty())
					continue;
				totalAmount += memberPayment.get().getAmount();
			}
		}
		return totalAmount;
	}

	@Override
	public List<TravelDto> getInvisibleTravelList(Authentication authentication) {
		Member member = (Member)authentication.getPrincipal();

		List<Travel> travelList = travelRepository.findInvisibleTravelForMember(member);

		// for문을 통해 Travel entity를 TravelDto로 변환
		List<TravelDto> travels = new ArrayList<>();
		for(Travel travel: travelList){
			String travelLocation = "";
			String travelType ="";

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
				Optional<Country> countryByCountryId = countryRepository.findCountryByCountryId(travel.getTravelLocation());
				if(countryByCountryId.isEmpty()) throw new CityException(ErrorCode.NOT_EXIST_COUNTRY);
				travelType=countryByCountryId.get().getCountryCode();
				travelLocation = countryByCountryId.get().getCountryName();
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
}
