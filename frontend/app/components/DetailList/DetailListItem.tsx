import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Chip } from 'react-native-paper';

import DetailItemStatus from './DetailItemStatus';
import { TextStyles } from '../../styles/CommonStyles';

type detailItemProps = {
	title: string;
	time: string;
	balance: number;
	party: string;
	abroad: boolean;
	calculateStatus: string;
};
function DetailListItem(props: detailItemProps) {
	return (
		<View style={styles.detail_item_container}>
			<View style={styles.detail_item_main}>
				<View style={styles.title_status}>
					<Text style={TextStyles().regular}>{props.title}</Text>
					{props.calculateStatus != 'NONE' ? (
						<Chip style={styles.chip}>{props.calculateStatus}</Chip>
					) : null}

					{/* <Chip style={styles.chip}>{props.calculateStatus}</Chip>; */}
				</View>
				<Text style={TextStyles().regular}>{props.balance}원</Text>
			</View>
			<View style={styles.detail_item_sub}>
				<Text style={TextStyles().small}>{props.time}</Text>
				<Text style={TextStyles().small}>{props.party}</Text>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	balance: {},
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
});
export default DetailListItem;
