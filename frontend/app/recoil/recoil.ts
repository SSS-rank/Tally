import { atom } from 'recoil';

import { TripListItemProps, TripInfo } from './../model/trip';
import { Account } from '../model/account';
import { Token } from '../model/token';

export const TokenState = atom<Token>({
	key: 'tokenState',
	default: {
		accessToken: '',
		accessTokenExpireTime: '',
		refreshToken: '',
		refreshTokenExpireTime: '',
	},
});

// 등록하는 여행지 정보
export const TripInfoState = atom<TripInfo>({
	key: 'tripInfoState',
	default: {
		title: '',
		location: 0,
		type: '',
		startDay: '',
		endDay: '',
	},
});

// 여행 중인 여행지 목록
export const ongoingTripListState = atom<TripListItemProps[]>({
	key: 'ongoingTripListState',
	default: [],
});

// 연결된 계좌 목록
export const tallyAccountListState = atom<Account[]>({
	key: 'tallyAccountListState',
	default: [],
});
