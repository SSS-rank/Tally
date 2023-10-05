package com.sss.tally;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableMongoAuditing
@SpringBootApplication
@EnableFeignClients
public class TallyApplication {

	public static void main(String[] args) {
		SpringApplication.run(TallyApplication.class, args);
	}

}
