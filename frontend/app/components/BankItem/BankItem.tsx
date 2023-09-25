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
			<Avatar.Image
				style={styles.image}
				size={50}
				source={{
					uri: `https://sss-tally.s3.ap-northeast-2.amazonaws.com/${BankCode[bankName]}.png`,
				}}
			/>
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
		height: 100,
	},
	image: {
		backgroundColor: 'transparent',
	},
	text: {
		...TextStyles({ align: 'left', mTop: 8 }).regular,
	},
});

export default BankItem;
