import React from 'react';
import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilValue } from 'recoil';

import { MemberState } from '../../recoil/memberRecoil';
import { TextStyles } from '../../styles/CommonStyles';
import { ViewStyles } from '../../styles/HomeStyles';
function MainHeader({ navigation }: any) {
	return (
		<View style={ViewStyles({ flexDirection: 'row' }).header}>
			<Text
				style={{
					...TextStyles({ align: 'left', weight: 'bold', color: 'white' }).title,
					flex: 1,
				}}
			>
				TALLY
			</Text>
			<MaterialCommunityIcons
				name="bell"
				color="white"
				size={24}
				onPress={() => navigation.navigate('Alert')}
			/>
		</View>
	);
}
export default MainHeader;
