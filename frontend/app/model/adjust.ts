import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TripStackProps } from '../navigation/TripStack';

export type adjustListItemProps = {
	adjustList: adjustListItem[];
	// navigation?: NativeStackScreenProps<TripStackProps>;
};

export type adjustItemProps = {
	adjustList: adjustListItem;
	onPress: () => void;
	// navigation: NativeStackScreenProps<TripStackProps>;
};

export type adjustListItem = {
	calculate_group_uuid: string;
	created_time: string;
	amount: number;
	status: string;
	receiver_name?: string;
	// navigation?: NativeStackScreenProps<TripStackProps>;
};

export type requestDetail = {
	member_name?: string | undefined;
	member_uuid?: string | undefined;
	member_profile?: string | undefined;
	amount?: number | undefined;
	status?: string | undefined;
};

export type requestList = {
	travel_type: string;
	travel_name: string;
	request_date: string;
	total_amount: number;
	request_details: requestDetail[];
};

export type responseList = {
	travel_type: string;
	travel_name: string;
	request_date: string;
	total_amount: number;
	detail_list: responseDetail[];
};

export type responseDetail = {
	payment_name?: string | undefined;
	my_amount?: number | undefined;
	all_amount?: number | undefined;
	payment_date?: string | undefined;
};
