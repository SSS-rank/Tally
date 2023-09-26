import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { groupListItem, personalListItem } from '../../model/analysis';
import { TextStyles } from '../../styles/CommonStyles';

interface legendItem extends groupListItem {
	color: string;
}

function GroupChartLegendItem({
	member_name,
	member_uuid,
	money,
	percent,
	login,
	color,
}: legendItem) {
	return (
		<TouchableOpacity style={styles.legendItemView}>
			<View style={styles.textView}>
				<View style={{ ...styles.colorCircle, backgroundColor: color }}></View>
				<Text style={styles.name}>{member_name}</Text>
				<Text style={styles.text}>{percent}%</Text>
			</View>
			<View style={styles.textView}>
				<Text style={styles.text}>{money}원</Text>
				<Icon name="chevron-forward" size={24} color="#666666" />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	legendItemView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 14,
		marginHorizontal: 30,
	},
	textView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	colorCircle: {
		width: 24,
		height: 24,
		borderRadius: 50,
	},
	name: {
		...TextStyles({ align: 'left', mLeft: 10, weight: 'bold' }).regular,
	},
	text: {
		...TextStyles({ align: 'left', mLeft: 10 }).regular,
	},
});

export default GroupChartLegendItem;
