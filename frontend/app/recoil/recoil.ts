import { atom } from 'recoil';

import { TripListItemProps, TripInfo, CurTripInfo } from './../model/trip';
import { Account, AccountResgistReq } from '../model/account';
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

// 이체 비밀번호
export const transferPasswordState = atom<string>({
	key: 'transferPasswordState',
	default: '',
});

export const accountResgistReqState = atom<AccountResgistReq>({
	key: 'accountResgistReqState',
	default: {
		account_number: '',
		bank_code: '',
		order_number: 0,
		account_password: '',
	},
});

// 현재 확인 중인 여행지 정보
export const CurTripInfoState = atom<CurTripInfo>({
	key: 'CurTripInfoState',
	default: {
		id: 0,
		title: '',
		location: 0,
		startDay: '',
		endDay: '',
	},
});

// fcmToken 정보
export const FcmTokenState = atom<string>({
	key: 'FcmTokenState',
	default: '',
});
