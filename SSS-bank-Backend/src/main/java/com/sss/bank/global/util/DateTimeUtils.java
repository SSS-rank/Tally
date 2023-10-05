package com.sss.bank.global.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class DateTimeUtils {
	public static LocalDateTime convertToLocalDateTime(Date date){
		return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
	}
}
