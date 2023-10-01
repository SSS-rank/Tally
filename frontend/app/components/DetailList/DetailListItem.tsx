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
				})
			}
		>
			<Text>{item.payment_date.split('T')[0]}</Text>
			<View style={styles.detail_item_container}>
				<View style={styles.detail_item_main}>
					<View style={styles.title_status}>
						<Text style={TextStyles().regular}>{item.payment_name}</Text>
						{item.calculate_status != 'NONE' ? (
							<DetailItemStatus status={item.calculate_status} />
						) : null}
						{!item.visible ? <Icon style={styles.lock} name="lock" /> : null}
					</View>

					<Text style={TextStyles().regular}>{item.amount}원</Text>
				</View>
				<View style={styles.detail_item_sub}>
					<Text style={TextStyles().small}>{item.payment_date.split('T')[1]}</Text>
					<Text style={TextStyles().small}>
						{item.participants ? item.participants.join(',') : ''}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	itemContainer: {
		marginBottom: 10,
	},
	title_status: {
		flexDirection: 'row',
	},
	detail_item_container: {
		flexDirection: 'column',
		padding: 10,
	},
	detail_item_main: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	detail_item_sub: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	chip: {
		height: 30,
		width: 75,
		marginLeft: 10,
		marginTop: 0,
		marginBottom: 10,
		justifyContent: 'center',
	},
	lock: {
		marginLeft: 5,
		fontSize: 20,
		justifyContent: 'center',
	},
});
export default DetailListItem;
