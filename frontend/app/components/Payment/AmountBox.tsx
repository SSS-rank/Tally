import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

import { TextStyles } from '../../styles/CommonStyles';
interface AmountBoxProps {
	isCash: boolean;
	isPayer: boolean;
	totAmount: string;
	paymentUnit: string;
	calculateStatus: number;
	setTotAmount: React.Dispatch<React.SetStateAction<string>>;
}
function AmountBox({
	isCash,
	isPayer,
	totAmount,
	paymentUnit,
	setTotAmount,
	calculateStatus,
}: AmountBoxProps) {
	return (
		<View style={styles.amount_container}>
			{isCash && isPayer && (calculateStatus == 0 || calculateStatus == 1) ? (
				<TextInput
					value={totAmount}
					onChangeText={(memo) => {
						setTotAmount(memo);
					}}
					returnKeyType="next"
					keyboardType="numeric"
					style={styles.amountInput}
					selectionColor="#91C0EB"
					placeholder={totAmount}
				/>
			) : (
				<Text
					style={{ ...TextStyles({ align: 'right', weight: 'bold', mRight: 10 }).header, flex: 1 }}
				>
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
		padding: 20,
		backgroundColor: '#F6F6F6',
		flexDirection: 'row',
		alignItems: 'center',
	},
	amountInput: {
		width: 100,
		// backgroundColor: 'F6F6F6',
		flex: 1,
		...TextStyles({ align: 'right', weight: 'bold' }).header,
	},
});
