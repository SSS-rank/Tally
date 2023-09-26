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
