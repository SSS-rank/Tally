import { atom } from 'recoil';

import { OcrData } from '../model/payment';
export const OcrState = atom<OcrData>({
	key: 'OcrState',
	default: {
		title: '',
		date: '',
		amount: '',
		cur_type: '',
	},
});
