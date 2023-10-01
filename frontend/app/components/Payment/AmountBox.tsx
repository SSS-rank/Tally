import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import { TextStyles } from '../../styles/CommonStyles';
interface AmountBoxProps {
	isCash: boolean;
	isPayer: boolean;
	totAmount: string;
	paymentUnit: string;
	setTotAmount: React.Dispatch<React.SetStateAction<string>>;
}
function AmountBox({ isCash, isPayer, totAmount, paymentUnit, setTotAmount }: AmountBoxProps) {
	return (
		<View style={styles.amount_container}>
			{isCash && isPayer ? (
				<TextInput
					value={totAmount}
					onChangeText={(memo) => {
						setTotAmount(memo);
					}}
					returnKeyType="next"
					keyboardType="numeric"
					style={styles.amountInput}
					selectionColor="#F6F6F6"
					placeholder={totAmount}
				/>
			) : (
				<Text style={TextStyles({ align: 'left', weight: 'bold', mRight: 10 }).header}>
					{totAmount}
				</Text>
			)}
			<Text style={TextStyles({ align: 'left' }).regular}>{paymentUnit}</Text>
		</View>
	);
}
export default AmountBox;
const styles = StyleSheet.create({
	amount_container: {
		flex: 2,
		padding: 40,
		backgroundColor: '#F6F6F6',
		flexDirection: 'row',
		alignItems: 'center',
	},
	amountInput: {
		width: 100,
		backgroundColor: 'F6F6F6',
		...TextStyles({ align: 'left', weight: 'bold' }).header,
	},
});
