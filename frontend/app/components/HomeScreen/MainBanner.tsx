import React from 'react';
import { Text, View } from 'react-native';

import { useRecoilValue } from 'recoil';

import { MemberState } from '../../recoil/memberRecoil';
import { TextStyles } from '../../styles/CommonStyles';
import { ViewStyles } from '../../styles/HomeStyles';
function MainBanner() {
	const memberinfo = useRecoilValue(MemberState);
	return (
		<View style={ViewStyles().banner}>
			<Text style={TextStyles({ align: 'left' }).small}>
				<Text style={TextStyles({ align: 'left', weight: 'bold' }).regular}>
					{memberinfo.nickname}
				</Text>
				님, 어디로 떠나시나요?
			</Text>
			<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).header, marginVertical: 15 }}>
				톡! 찍으면{'\n'}이체까지 딱!
			</Text>
			<Text style={TextStyles({ align: 'left' }).small}>
				언제 어디서든{'\n'}바로 확인하고 정산하는{'\n'}간편한 여행
			</Text>
		</View>
	);
}
export default MainBanner;
