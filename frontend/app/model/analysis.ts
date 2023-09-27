export interface groupListItem {
	member_name: string;
	money: number;
	percent: number;
	login: boolean;
	member_uuid: string;
}

export interface personalListItem {
	category_id: number;
	category_type: string;
	percent: number;
	money: number;
}

export interface categoryListItem {
	payment_korea_date: string;
	payment_uuid: string;
	payment_title: string;
	tag_member: string[];
	total_money: number;
	my_money: number;
}
