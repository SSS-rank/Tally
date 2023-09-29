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
}

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
