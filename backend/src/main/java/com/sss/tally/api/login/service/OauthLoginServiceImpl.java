package com.sss.tally.api.login.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sss.tally.api.login.dto.OauthLoginDto;
import com.sss.tally.domain.defaultchecklist.service.DefaultCheckListService;
import com.sss.tally.domain.device.entity.Device;
import com.sss.tally.domain.device.repository.DeviceRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.external.kakao.service.KakaoLoginApiService;
import com.sss.tally.external.model.OAuthAttributes;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.MemberException;
import com.sss.tally.global.jwt.dto.JwtTokenDto;
import com.sss.tally.global.jwt.service.JwtProvider;
import com.sss.tally.global.redis.service.RedisService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class OauthLoginServiceImpl implements OauthLoginService {
	private final KakaoLoginApiService kakaoLoginApiService;
	private final MemberRepository memberRepository;
	private final RedisService redisService;
	private final JwtProvider jwtProvider;
	private final DeviceRepository deviceRepository;
	private final DefaultCheckListService defaultCheckListService;

	@Override
	public OauthLoginDto.OauthLoginRespDto oauthLogin(OauthLoginDto.OauthLoginReqDto oauthLoginReqDto) {
		OAuthAttributes userInfo = kakaoLoginApiService.getMemberInfo(oauthLoginReqDto.getKakaoAccessToken());

		JwtTokenDto jwtTokenDto;
		Optional<Member> optionalMember = memberRepository.findMemberByKakaoId(userInfo.getKakaoId());

		if (optionalMember.isEmpty()) { //신규 회원
			String memberUuid = UUID.randomUUID().toString();
			Member oauthMember = Member.of(memberUuid, userInfo);
			oauthMember = memberRepository.save(oauthMember);
			// 토큰 생성
			jwtTokenDto = jwtProvider.createJwtTokenDto(oauthMember.getMemberUuid());
			redisService.setValues(memberUuid, jwtTokenDto.getRefreshToken());
			// device 등록
			Optional<Device> checkDevice = deviceRepository.findDeviceByDeviceTokenAndIsLoginIsTrue(
				oauthLoginReqDto.getDeviceToken());
			checkDevice.ifPresent(device -> device.updateLogin(false));

			deviceRepository.save(Device.of(oauthMember, oauthLoginReqDto.getDeviceToken()));
			//체크리스트 생성
			defaultCheckListService.createInitCheckList(oauthMember);
		} else { //이미 존재하는 회원
			Member oauthMember = optionalMember.get();
			if (oauthMember.getWithdrawalDate() != null && oauthMember.getWithdrawalDate()
				.isBefore(LocalDateTime.now()))
				throw new MemberException(ErrorCode.ALREADY_WITHDRAWAL_MEMBER);
			// 토큰 생성
			jwtTokenDto = jwtProvider.createJwtTokenDto(oauthMember.getMemberUuid());
			redisService.setValues(oauthMember.getMemberUuid(), jwtTokenDto.getRefreshToken());
			// device 등록
			Optional<Device> checkDevice = deviceRepository.findDeviceByDeviceTokenAndMemberId(
				oauthLoginReqDto.getDeviceToken(), oauthMember
			);
			// 해당 멤버 + 기기토큰으로 검색했는데 이미 존재하면 true 처리
			// 한 기기에서 로그아웃 하고 다시 로그인 하는 경우
			if (checkDevice.isPresent()) {
				checkDevice.get().updateLogin(true);
			} else {
				// 기기가 다른 멤버 아이디로 로그인 되어 있는 경우
				Optional<Device> device = deviceRepository.findDeviceByDeviceTokenAndIsLoginIsTrue(
					oauthLoginReqDto.getDeviceToken());
				device.ifPresent(value -> value.updateLogin(false));
				// 멤버가 다른 기기에서 로그인 되어 있는 경우
				device = deviceRepository.findDeviceByMemberIdAndIsLoginIsTrue(oauthMember);
				device.ifPresent(value -> value.updateLogin(false));
				// 예외처리 후 insert 시켜주기
				deviceRepository.save(Device.of(oauthMember, oauthLoginReqDto.getDeviceToken()));
			}
		}
		return OauthLoginDto.OauthLoginRespDto.from(jwtTokenDto);
	}
}
