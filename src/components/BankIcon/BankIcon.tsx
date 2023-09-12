import React from 'react';

import { Box } from '@mui/material';

import kb from '../../asset/image/bank/004.png';
import nh from '../../asset/image/bank/011.png';
import woori from '../../asset/image/bank/020.png';
import shinhan from '../../asset/image/bank/088.png';
import kakao from '../../asset/image/bank/090.png';
import toss from '../../asset/image/bank/092.png';

interface BankIconProps {
	code: string;
}

function BankIcon({ code }: BankIconProps): any {
	let icon = null;

	if (code === '088') icon = <Box component="img" src={shinhan}></Box>; // 신한
	else if (code === '020') icon = <Box component="img" src={woori}></Box>; // 우리
	else if (code === '090') icon = <Box component="img" src={kakao}></Box>; // 카뱅
	else if (code === '092') icon = <Box component="img" src={toss}></Box>; // 토스
	else if (code === '004') icon = <Box component="img" src={kb}></Box>; // KB
	else if (code === '011') icon = <Box component="img" src={nh}></Box>; // NH

	return icon;
}

export default BankIcon;
