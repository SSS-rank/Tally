import { atom } from 'recoil';

import { Member } from '../model/member';

export const MemberState = atom<Member>({
	key: 'memberState',
	default: {
		member_uuid: '',
		nickname: '',
		profile_image: '',
	},
});
