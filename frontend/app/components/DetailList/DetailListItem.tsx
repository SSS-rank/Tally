import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import DetailItemStatus from './DetailItemStatus';
import { Payment } from '../../model/payment';
import { TextStyles } from '../../styles/CommonStyles';

type detailItemProps = {
	item: Payment;
	navigation: any;
};
function DetailListItem({ item, navigation }: detailItemProps) {
	return (
		<TouchableOpacity
			style={styles.itemContainer}
			onPress={() =>
				navigation.navigate('ModifyPayment', {
					payment_uuid: item.payment_uuid,
					payer: item.payer,
					method: item.payment_method,
					payment_date: item.payment_date,
				})
			}
		>
			<Text style={[styles.info, { marginBottom: 3 }]}>{item.payment_date.split('T')[0]}</Text>
			<View style={styles.detail_item_main}>
				<View style={styles.title_status}>
					<Text style={styles.paymentName}>{item.payment_name}</Text>
					{item.calculate_status != 'NONE' ? (
						<DetailItemStatus status={item.calculate_status} />
					) : null}
					{!item.visible ? <Icon style={styles.lock} name="lock" /> : null}
				</View>

				<Text style={styles.money}>{item.amount}원</Text>
			</View>
			<View style={styles.detail_item_sub}>
				<Text style={styles.info}>{item.payment_date.split('T')[1]}</Text>
				<Text style={styles.info}>{item.participants ? item.participants.join(',') : ''}</Text>
			</View>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	itemContainer: {
		marginBottom: 20,
	},
	paymentName: {
		...TextStyles({ align: 'left', weight: 'bold' }).title,
	},
	info: {
		...TextStyles({ align: 'left', color: '#666666' }).small,
	},
	money: {
		...TextStyles({ align: 'left', weight: 'bold' }).medium,
	},
	title_status: {
		flexDirection: 'row',
	},
	detail_item_main: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 5,
	},
	detail_item_sub: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	lock: {
		marginLeft: 5,
		fontSize: 20,
		justifyContent: 'center',
	},
});
export default DetailListItem;
