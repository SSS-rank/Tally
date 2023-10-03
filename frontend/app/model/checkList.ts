export interface DefaultCheckListItem {
	default_check_list_id: number;
	content: string;
	status: boolean;
}

export interface CustomCheckListItem {
	custom_check_list_id: number;
	content: string;
	status: boolean;
}

export interface CheckItemState {
	checkListItem: DefaultCheckListItem[];
}
