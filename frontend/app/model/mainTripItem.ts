import { Member } from './member';

export interface TravelSheetItem {
	travelTitle: string;
	travelLocation: string;
	travelType: string;
	startDate: string;
	endDate: string;
	remainDate: number;
	travelParticipants: Member[];
	money: number;
	navigation: any;
}

type ObjType = {
	[key: string]: string;
};

export const Location: ObjType = {
	서울특별시: 'seoul',
	부산광역시: 'busan',
	미합중국: 'newyork',
	일본: 'tokyo',
	중국: 'beijing',
	스위스: 'bern',
	영국: 'london',
	베트남: 'hanoi',
};

export type ItemData = {
	id: number;
	color: string;
	dday: number;
	title: string;
	startDate: string;
	endDate: string;
	balance: number;
	profile1: string;
	profile2: string;
	profile3: string;
};

export interface ItemProps extends ItemData {
	onPress: () => void;
}
