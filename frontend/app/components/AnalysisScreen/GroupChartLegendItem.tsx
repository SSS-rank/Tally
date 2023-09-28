import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { groupListItem, personalListItem } from '../../model/analysis';
import { TripStackProps } from '../../navigation/TripStack';
import { TextStyles } from '../../styles/CommonStyles';

interface legendItem extends groupListItem {
	color: string;
	navigation:
		| NativeStackNavigationProp<TripStackProps, 'AnalysisCategory', 'AnalysisPersonal'>
		| undefined;
}

function GroupChartLegendItem({
	member_name,
	member_uuid,
	money,
	percent,
	login,
	color,
	navigation,
}: legendItem) {
	return (
		<TouchableOpacity
			style={styles.legendItemView}
			onPress={() =>
				!login &&
				navigation?.navigate('AnalysisPersonal', { member_uuid: member_uuid, title: member_name })
			}
		>
			<View style={styles.textView}>
				<View style={{ ...styles.colorCircle, backgroundColor: color }}></View>
				<Text style={styles.name}>
					{member_name} {login && <Text>(나)</Text>}
				</Text>
				<Text style={styles.percent}>{percent}%</Text>
			</View>
			<View style={styles.textView}>
				<Text style={styles.text}>{money}원</Text>
				{!login && <Icon name="chevron-forward" size={24} color="#666666" />}
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
		width: 16,
		height: 16,
		borderRadius: 50,
	},
	name: {
		...TextStyles({ align: 'left', mLeft: 10, weight: 'bold' }).regular,
	},
	percent: {
		...TextStyles({ align: 'left', mLeft: 10, color: '#666666' }).regular,
	},
	text: {
		...TextStyles({ align: 'left', mLeft: 10, weight: 'bold' }).medium,
	},
});

export default GroupChartLegendItem;
