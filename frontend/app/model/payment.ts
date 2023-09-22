export interface DirectPayReq {
	amount: number; // 결제 금액(Long)
	category: number; // category type id(Long)
	memo: string; // 한줄 메모 (String)
	payment_date_time: string; // 결제 시간(yyyy-MM-dd HH:mm) String!!!
	payment_participants: Array<DirectPayMember>;
	payment_type: string; // 결제 타입 "cash" or "card" String
	payment_unit_id: number; // 결제 단위 (달러, 엔 등) Long
	ratio: number; // 비율 amount에 원화가 되기 위해 곱해야하는 값.
	title: string; // 거래처 String
	travel_id: number; // 여행 id (Long)
	visible: boolean;
}
export interface Payment {
	payment_uuid: string; // 결제 uuid (string)
	category_id: number; // 카테고리 id(Long)
	amount: number; // 결제 총 금액(int)
	payment_date: string; // 결제 시간(String)
	payment_memo: string; // 결제 상세 메모(String)
	payment_method: string; // 결제 방식(String)
	payment_unit: string; // 결제 단위(String)
	visible: boolean; // 공개여부(boolean)
	payment_name: string; // 예금주(String)
	calculate_status: string;
	participants: string[];
}

export interface DirectPayMember {
	amount: number;
	member_uuid: string;
}
