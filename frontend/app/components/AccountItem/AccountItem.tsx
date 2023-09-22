import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

import { Account } from '../../model/account';
import { TextStyles } from '../../styles/CommonStyles';

function AccountItem({ accountNumber, balance, bankCode, bankName }: Account) {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				marginVertical: 15,
				marginHorizontal: 5,
			}}
		>
			<Avatar.Image
				style={{ backgroundColor: 'transparent', marginHorizontal: 5 }}
				size={48}
				source={require('../../assets/images/kakao.png')}
			/>
			<View style={{ paddingHorizontal: 10, flex: 1 }}>
				<Text
					style={{
						...TextStyles({ align: 'left' }).medium,
						lineHeight: 20,
					}}
				>
					{bankName} {accountNumber}
				</Text>
				<Text
					style={{
						...TextStyles({ align: 'left' }).regular,
						lineHeight: 20,
					}}
				>
					{balance}원
				</Text>
			</View>
		</View>
	);
}

export default AccountItem;
