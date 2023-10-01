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
	payer: string; //결제자 uuid
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
// 결제 추가 시 사용하는 멤버
export interface SelectPayMember {
	amount: number;
	member_uuid: string;
	checked: boolean;
	member_nickname: string;
	image: string;
}

//결제 수정시 사용되는 멤버
export interface ModMember {
	member_uuid: string;
	amount: number;
	nickname: string;
	profile_image: string;
	payer: boolean;
	with: boolean;
}

//결제 내역  Response
export interface PaymentDetailRes {
	payment_uuid: string; // 결제 uuid(String)
	category: number; // 카테고리 id(Long)
	memo: string; // 메모(String)
	visible: boolean; // 공개여부(boolean)
	amount: number; // 총금액(int)
	payment_unit: string; // 결제 단위(String)
	payment_date: string; // 결제 시간(String)
	payment_participants: ModMember[];
}

export interface PaymentModifyReq {
	amount?: string;
	category: number;
	memo: string;
	payment_date_time?: string;
	payment_participants: DirectPayMember[];
	payment_uuid: string;
	travel_id: number;
	title?: string;
	visible: boolean;
	ratio?: number;
	payment_unit_id?: number;
}
