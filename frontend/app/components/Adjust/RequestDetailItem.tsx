import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { requestDetail } from '../../model/adjust';
import { TextStyles } from '../../styles/CommonStyles';
const RequestDetailItem = ({ member_name, amount }: requestDetail) => {
	return (
		<TouchableOpacity
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				height: 70,
				paddingHorizontal: 10,
				width: '100%',
			}}
			onPress={() => {}}
		>
			<Text style={{ ...TextStyles().regular }}>{member_name}</Text>
			<Text
				style={{
					...TextStyles({ align: 'right' }).title,
					flex: 1,
					lineHeight: 70,
					verticalAlign: 'middle',
				}}
			>
				{amount}원
			</Text>
			<Icon name="chevron-forward" size={20} color="#666666" style={{ marginLeft: 5 }} />
		</TouchableOpacity>
	);
};

export default RequestDetailItem;
