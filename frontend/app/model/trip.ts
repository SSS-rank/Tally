export interface TripListItemProps {
	id: number;
	title: string;
	location: string; // 국가 코드
	type: string; // 여행지 이름
	startDay: string;
	endDay: string;
}

export interface TripInfo {
	title: string;
	location: number;
	type: string;
	startDay: string;
	endDay: string;
}
