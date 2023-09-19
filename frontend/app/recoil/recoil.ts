import { atom } from 'recoil';

import { Token } from '../model/token';
import { TripInfo } from '../model/trip';

export const TokenState = atom<Token>({
	key: 'tokenState',
	default: {
		accessToken: '',
		accessTokenExpireTime: '',
		refreshToken: '',
		refreshTokenExpireTime: '',
	},
});

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
