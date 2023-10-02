package com.sss.tally.domain.travelgroup.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.sss.tally.api.notification.dto.NotificationDto;
import com.sss.tally.domain.device.entity.Device;
import com.sss.tally.domain.device.repository.DeviceRepository;
import com.sss.tally.domain.memberpayment.entity.MemberPayment;
import com.sss.tally.domain.memberpayment.repository.MemberPaymentRepository;
import com.sss.tally.domain.notification.document.Notification;
import com.sss.tally.domain.notification.repository.NotificationRepository;
import com.sss.tally.domain.notification.service.NotificationService;
import com.sss.tally.domain.payment.entity.Payment;
import com.sss.tally.domain.payment.repository.PaymentRepository;
import com.sss.tally.global.error.exception.NotificationException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.member.dto.MemberDto;
import com.sss.tally.api.travel.dto.TravelDto;
import com.sss.tally.domain.customchecklist.service.CustomCheckListService;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.travel.entity.Travel;
import com.sss.tally.domain.travel.repository.TravelRepository;
import com.sss.tally.domain.travelgroup.entity.TravelGroup;
import com.sss.tally.domain.travelgroup.repository.TravelGroupRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.TravelException;
import com.sss.tally.global.error.exception.TravelGroupException;

import lombok.RequiredArgsConstructor;

import javax.swing.*;

@Service
@Transactional
@RequiredArgsConstructor
public class TravelGroupServiceImpl implements TravelGroupService {
	private final TravelRepository travelRepository;
	private final TravelGroupRepository travelGroupRepository;
	private final CustomCheckListService customCheckListService;
	private final PaymentRepository paymentRepository;
	private final MemberPaymentRepository memberPaymentRepository;
	private final NotificationService notificationService;
	private final NotificationRepository notificationRepository;
	private final DeviceRepository deviceRepository;

	@Override
	public void addTravelGroup(Authentication authentication, Long travelId) {
		Member member = (Member) authentication.getPrincipal();

		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(travelId);
		if (travelOptional.isEmpty())
			throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);

		if(travelGroupRepository.existsTravelGroupByMemberIdAndTravelId(member, travelOptional.get()))
			throw new TravelGroupException(ErrorCode.ALREADY_EXIST_PARTICIPANTS);

		//알림 보내기
		Travel travel = travelOptional.get();
		String travelName = travel.getTravelTitle();
		List<Member> memberList = travelGroupRepository.findMembersByTravelId(travelId);
		//맨 처음 여행 만들떄는 알림 전송하면 안됨
		if(!memberList.isEmpty()){


			List<NotificationDto.NotificationReqDto> notificationReqDtoList = new ArrayList<>();
			for(Member memberInTravel : memberList){
				//알림에 저장
				Notification notification = Notification.of("travel-add", "555",
						"Tally_", memberInTravel.getMemberUuid(), memberInTravel.getNickname(), travelName, "");
				notificationRepository.save(notification);
				//실제 보내기 위한 준비
				Optional<Device> deviceOptional = deviceRepository.findDeviceByMemberIdAndDeviceStatusIsTrueAndIsLoginIsTrue(
						memberInTravel);
				if (deviceOptional.isEmpty()) {
					throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
				}
				Device device = deviceOptional.get();
				NotificationDto.NotificationReqDto notificationReqDto = NotificationDto.NotificationReqDto.of(device,
						member.getNickname() + " 님이 " + travel.getTravelTitle() + "에 참여하였습니다.", "여행 참여");
				notificationReqDtoList.add(notificationReqDto);
			}

			//실제 전송
			List<NotificationDto.NotificationRespDto> notificationRespDtoList = notificationService.sendNotificationList(
					notificationReqDtoList);

			List<NotificationDto.NotificationReqDto> notificationReqDtoFailList = new ArrayList<>();
			boolean flag = false;
			// 빈 리스트에 대한 처리
			if (notificationRespDtoList.isEmpty()) {
				throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
			} else { //실패한 애들이이 있다면 따로 또 모으기
				for (NotificationDto.NotificationRespDto notificationRespDto : notificationRespDtoList) {
					if (notificationRespDto.getCode() == -1) {
						notificationReqDtoFailList.add(notificationRespDto.getNotificationReqDto());
						flag = true;
					}
				}
			}
			//실패한 애들 다시 모아서 다시 보내기
			if (flag) {
				List<NotificationDto.NotificationRespDto> reNotificationRespDtoList = notificationService.sendNotificationList(
						notificationReqDtoList);
				if (reNotificationRespDtoList.isEmpty()) {
					throw new NotificationException(ErrorCode.NOT_VALID_DEVICETOKEN);
				}//이번에도 보내기 실패하면 예외처리
				for (NotificationDto.NotificationRespDto notificationRespDto : reNotificationRespDtoList) {
					if (notificationRespDto.getCode() == -1) {
						throw new NotificationException(ErrorCode.FAIL_SEND_NOTIFICATION);
					}
				}
			}
		}

		//자기 자신에게는 알림 보내면 안되니 저장하기 전에 알림 보내기
		travelGroupRepository.save(TravelGroup.of(member, travelOptional.get()));
		customCheckListService.createInitCustomCheckList(member, travelOptional.get());

		List<Payment> paymentList = paymentRepository.findAllByTravelIdAndStatusIsFalse(travelOptional.get());
		for(Payment payment: paymentList){
			memberPaymentRepository.save(MemberPayment.from(member, payment, true, 0L));
		}
	}

	@Override
	public List<MemberDto.MemberTravelDto> getTravelGroup(Authentication authentication, Long travelId) {
		Member member = (Member) authentication.getPrincipal();

		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(travelId);
		if(travelOptional.isEmpty()) throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);

		if(!travelGroupRepository.existsByTravelIdAndMemberIdAndVisibleIsTrue(travelOptional.get(), member))
			throw new TravelException(ErrorCode.NOT_EXIST_PARTICIPANT);

		List<Member> memberIds = travelGroupRepository.findMembersByTravelId(travelId);
		return memberIds.stream()
				.map(MemberDto.MemberTravelDto::from)
				.collect(Collectors.toList());
	}

	@Override
	public void modifyTravelVisible(Authentication authentication, TravelDto.TravelVisibleReqDto travelVisibleReqDto) {
		Member member = (Member) authentication.getPrincipal();

		Optional<Travel> travelOptional = travelRepository.findTravelByTravelId(travelVisibleReqDto.getTravelId());
		if(travelOptional.isEmpty()) throw new TravelException(ErrorCode.NOT_EXIST_TRAVEL);
		if(travelOptional.get().getEndDate().isAfter(LocalDate.now()) || travelOptional.get().getStartDate().isAfter(LocalDate.now()))
			throw new TravelException(ErrorCode.NOT_EDIT_VISIBLE);

		Optional<TravelGroup> travelGroupOptional = travelGroupRepository.findTravelGroupByMemberIdAndTravelId(member, travelOptional.get());
		if(travelGroupOptional.isEmpty()) throw new TravelGroupException(ErrorCode.NOT_EXIST_PARTICIPANT);

		travelGroupOptional.get().updateVisible(travelVisibleReqDto.isVisible());
	}
}
