package com.sss.bank.global.service;

import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedisService {

	@Autowired
	private RedisTemplate<String, String> redisTemplate;

	public String getValues(String key) {

		ValueOperations<String, String> values = redisTemplate.opsForValue();
		return values.get(key);
	}

	public void setValues(String key, String value) {
		redisTemplate.opsForValue().set(key, value);
		redisTemplate.expire(key, 30, TimeUnit.DAYS);
	}

	public void expireValues(String key) {
		redisTemplate.expire(key, 0, TimeUnit.SECONDS);
	}

	public void setSets(String key, String... values) {
		redisTemplate.opsForSet().add(key, values);
	}

	public Set getSets(String key) {
		return redisTemplate.opsForSet().members(key);
	}

}