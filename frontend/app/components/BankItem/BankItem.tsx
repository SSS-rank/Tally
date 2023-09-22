import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';

import { BankCode } from '../../model/bank';
import { TextStyles } from '../../styles/CommonStyles';

interface BankItemProp {
	bankName: string;
	setBankName: (name: string) => void;
	setBankCode: (code: string) => void;
	setModalVisible: (state: boolean) => void;
}

function BankItem({ bankName, setBankName, setBankCode, setModalVisible }: BankItemProp) {
	const selectBank = () => {
		setBankName(bankName);
		setBankCode(BankCode[bankName]);
		setModalVisible(false);
	};
	return (
		<TouchableOpacity style={styles.viewContainer} onPress={selectBank}>
			<Avatar.Image source={require('../../assets/images/kakao.png')} />
			<Text style={styles.text}>{bankName}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		width: 140,
		marginVertical: 10,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		...TextStyles({ align: 'left', mTop: 8 }).regular,
	},
});

export default BankItem;
