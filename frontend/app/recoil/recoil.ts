import { atom } from 'recoil';

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
