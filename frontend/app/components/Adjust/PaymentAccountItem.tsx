import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Avatar } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import { Account } from '../../model/account';
import { TextStyles } from '../../styles/CommonStyles';

interface AccountItemProp extends Account {
	setSelectedAccountChange: (value: string) => void;
}

const PaymentAccountItem = ({
	accountNumber,
	balance,
	bankCode,
	bankName,
	representativeAccount,
	setSelectedAccountChange,
}: AccountItemProp) => {
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
				size={40}
				source={{
					uri: `https://sss-tally.s3.ap-northeast-2.amazonaws.com/${bankCode}.png`,
				}}
			/>
			<View style={{ paddingHorizontal: 10, flex: 1 }}>
				<Text
					style={{
						...TextStyles({ align: 'left' }).regular,
						lineHeight: 20,
					}}
				>
					{bankName} {accountNumber}
				</Text>
				<Text
					style={{
						...TextStyles({ align: 'left' }).medium,
						lineHeight: 20,
					}}
				>
					{balance}원
				</Text>
			</View>
			<Icon
				name={representativeAccount ? 'checkmark-circle' : 'checkmark-circle-outline'}
				size={32}
				color={representativeAccount ? '#91C0EB' : '#D0D0D0'}
				style={{ marginLeft: 5 }}
				onPress={() => {
					setSelectedAccountChange(accountNumber);
				}}
			/>
		</View>
	);
};

export default PaymentAccountItem;
