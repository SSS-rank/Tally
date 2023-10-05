import { atom } from 'recoil';

import { joinStatus } from '../model/join';

export const JoinState = atom<joinStatus>({
	key: 'joinState',
	default: {
		isAgreed: false,
		travel_id: 0,
	},
});
