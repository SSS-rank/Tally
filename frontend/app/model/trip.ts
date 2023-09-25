import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TripStackProps } from '../navigation/TripStack';
export interface TripListItemProps {
	id: number;
	title: string;
	location: string; // 국가 코드
	type: string; // 여행지 이름
	startDay: string;
	endDay: string;
	navigation: NativeStackScreenProps<TripStackProps, 'TripDetail'>;
	travelParticipants: Array<TripMember>;
}
export interface TripMember {
	image: string;
	member_nickname: string;
	member_uuid: string;
}

export interface TripInfo {
	title: string;
	location: number;
	type: string;
	startDay: string;
	endDay: string;
}

export interface TripCreateRes {
	travel_id: number;
	travel_title: string;
	travel_location: string;
	travel_type: string;
	profile_image: string;
	profile_nickname: string;
	member_uuid: string;
	start_date: string;
	end_date: string;
}

export interface CurTripInfo {
	title: string;
	location: number;
	startDay: string;
	endDay: string;
}
