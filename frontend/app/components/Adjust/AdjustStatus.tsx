import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';

import { requestDetail } from '../../model/adjust';
import { TextStyles } from '../../styles/CommonStyles';

const AdjustStatus = ({ member_name, status, member_profile }: requestDetail) => {
	return (
		<View
			style={{
				marginBottom: 15,
				flexDirection: 'row',
				alignItems: 'center',
			}}
		>
			<Avatar.Image size={45} source={{ uri: member_profile }} />
			<Text
				style={{
					...TextStyles({ align: 'left' }).medium,
					flex: 1,
					paddingHorizontal: 10,
				}}
			>
				{member_name}
			</Text>
			{status === '요청 중' ? (
				<Text style={{ ...TextStyles({ align: 'right', color: '#91C0EB' }).medium }}>요청 중</Text>
			) : (
				<Text style={{ ...TextStyles({ align: 'right' }).medium }}>확인 완료</Text>
			)}
		</View>
	);
};

export default AdjustStatus;
