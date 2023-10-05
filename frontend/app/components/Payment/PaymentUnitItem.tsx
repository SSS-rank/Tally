import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { TextStyles } from '../../styles/CommonStyles';

interface PaymentUnitItemProp {
	cur_unit: string;
	cur_nm: string;
	deal_bas_r: string;
	curUnit: string;
	setCurUnit: (value: string) => void;
	setExData: (value: string) => void;
	setPaymentUnitModalVisible: (value: boolean) => void;
}

function PaymentUnitItem({
	cur_unit,
	cur_nm,
	deal_bas_r,
	curUnit,
	setCurUnit,
	setExData,
	setPaymentUnitModalVisible,
}: PaymentUnitItemProp) {
	const splitData = cur_nm.split(' ');
	const country = splitData[0] === '위안화' ? '중국' : splitData[0];
	const paymentUnitName = splitData[0] === '위안화' ? splitData[0] : splitData[1];

	function handleExPress() {
		setExData(deal_bas_r + ':' + cur_nm + '(' + cur_unit + ')');
		setCurUnit(cur_unit);
		setPaymentUnitModalVisible(false);
	}
	return (
		<TouchableOpacity style={styles.itemContainer} onPress={handleExPress}>
			{curUnit === cur_unit && (
				<>
					<Text style={styles.textBold}>
						{country}-{cur_unit}({paymentUnitName})
					</Text>
					<Icon name="check" size={30} color="#91C0EB" />
				</>
			)}
			{curUnit !== cur_unit && (
				<>
					<Text style={styles.text}>
						{country}-{cur_unit}({paymentUnitName})
					</Text>
				</>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	textBold: {
		...TextStyles({ align: 'left', weight: 'bold', color: '#91C0EB' }).regular,
	},
	text: {
		...TextStyles({ align: 'left' }).regular,
	},
});

export default PaymentUnitItem;
