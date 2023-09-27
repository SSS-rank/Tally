import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { personalListItem } from '../../model/analysis';
import { TripStackProps } from '../../navigation/TripStack';
import { TextStyles } from '../../styles/CommonStyles';

interface legendItem extends personalListItem {
	color: string;
	navigation: NativeStackNavigationProp<TripStackProps, 'AnalysisCategory'> | undefined;
}

function PersonalChartLegendItem({
	category_id,
	category_type,
	money,
	percent,
	color,
	navigation,
}: legendItem) {
	return (
		<TouchableOpacity
			style={styles.legendItemView}
			onPress={() =>
				navigation?.navigate('AnalysisCategory', { category_id: category_id, title: category_type })
			}
		>
			<View style={styles.textView}>
				<View style={{ ...styles.colorCircle, backgroundColor: color }}></View>
				<Text style={styles.name}>{category_type}</Text>
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

export default PersonalChartLegendItem;
