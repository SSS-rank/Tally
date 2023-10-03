import { atom } from 'recoil';

import { CheckItemState } from '../model/checkList';

export const CheckListState = atom<CheckItemState[]>({
	key: 'checkListState',
	default: [],
});
