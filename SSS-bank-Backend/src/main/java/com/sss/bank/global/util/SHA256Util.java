package com.sss.bank.global.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.stereotype.Component;

@Component
public class SHA256Util {

	public static String createSalt() {
		SecureRandom random = new SecureRandom();

		// 랜덤 8 바이트 base64 인코딩
		byte[] bytes = new byte[8];
		random.nextBytes(bytes);

		return new String(Base64.getEncoder().encode(bytes));
	}

	public static String getEncrypt(String password, String salt) throws NoSuchAlgorithmException {
		MessageDigest md = MessageDigest.getInstance("SHA-256");
		md.update((password + salt).getBytes());
		String hex = String.format("%064x", new BigInteger(1, md.digest()));
		return hex;
	}
}
