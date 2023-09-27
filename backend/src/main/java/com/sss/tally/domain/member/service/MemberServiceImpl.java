package com.sss.tally.domain.member.service;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.sss.tally.api.member.dto.MemberDto;
import com.sss.tally.domain.device.entity.Device;
import com.sss.tally.domain.device.repository.DeviceRepository;
import com.sss.tally.domain.member.entity.Member;
import com.sss.tally.domain.member.repository.MemberRepository;
import com.sss.tally.global.error.ErrorCode;
import com.sss.tally.global.error.exception.MemberException;
import com.sss.tally.global.redis.service.RedisService;
import com.sss.tally.global.s3.service.S3Uploader;
import com.sss.tally.global.util.SHA256Util;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{
	private final RedisService redisService;
	private final DeviceRepository deviceRepository;
	private final MemberRepository memberRepository;
	private final S3Uploader s3Uploader;

	@Override
	public void withdrawal(Authentication authentication) {
		Member auth = (Member)authentication.getPrincipal();
		Member member = memberRepository.findByMemberUuid(auth.getMemberUuid())
			.orElseThrow(()->new MemberException(ErrorCode.NOT_EXIST_MEMBER));
		// redis에 저장된 refreshtoken 만료 처리
		String refreshToken = redisService.getValues(member.getMemberUuid());
		if(StringUtils.hasText(refreshToken)){
			redisService.expireValues(member.getMemberUuid());
		} else {
			throw new MemberException(ErrorCode.NOT_VALID_TOKEN);
		}
		// device 로그아웃 처리
		Optional<Device> device = deviceRepository.findDeviceByMemberIdAndIsLoginIsTrue(member);
		device.ifPresent(value -> value.updateLogin(false));
		// 회원 탈퇴 날짜 저장
		member.withdrawal(LocalDateTime.now());
	}

	@Override
	public MemberDto.MemberRespDto getMemberInfo(Authentication authentication) {
		Member member = (Member)authentication.getPrincipal();
		return MemberDto.MemberRespDto.of(member.getMemberUuid(), member.getNickname(), member.getProfileImage());
	}

	@Override
	public MemberDto.MemberRespDto patchMemberInfo(Authentication authentication, String nickname, MultipartFile file) throws
		IOException {
		Member auth = (Member)authentication.getPrincipal();
		Member member = memberRepository.findByMemberUuid(auth.getMemberUuid())
				.orElseThrow(()->new MemberException(ErrorCode.NOT_EXIST_MEMBER));

		String imageSrc;
		if(file!=null)
			imageSrc = s3Uploader.upload(file);
		else
			imageSrc = member.getProfileImage();

		member.patchMemberInfo(nickname, imageSrc);
		return MemberDto.MemberRespDto.of(member.getMemberUuid(), member.getNickname(), member.getProfileImage());
	}

	@Override
	public void patchPassword(Authentication authentication, MemberDto.MemberPasswordDto memberPasswordDto) throws
		NoSuchAlgorithmException {
		Member auth = (Member)authentication.getPrincipal();
		Member member = memberRepository.findByMemberUuid(auth.getMemberUuid())
			.orElseThrow(()->new MemberException(ErrorCode.NOT_EXIST_MEMBER));
		String password = SHA256Util.getEncrypt(memberPasswordDto.getTransferPassword(), member.getTransferSalt());
		member.patchPassword(password);
	}

	@Override
	public Boolean checkPassword(Authentication authentication, MemberDto.MemberPasswordDto memberPasswordDto) throws
		NoSuchAlgorithmException {
		Member auth = (Member)authentication.getPrincipal();
		return auth.getTransferPassword()
			.equals(SHA256Util.getEncrypt(memberPasswordDto.getTransferPassword(), auth.getTransferSalt()));
	}
}
