import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { TextStyles } from '../../styles/CommonStyles';
interface categoryInfoProps {
	label: string;
	value: number | string;
	children?: React.ReactNode;
}

function CategoryInfo({ label, value, children }: categoryInfoProps) {
	return (
		<View style={styles.view}>
			<Text style={styles.label}>{label}</Text>
			{children === undefined && (
				<Text style={styles.value}>{typeof value == 'string' ? `${value}` : `${value}원`}</Text>
			)}
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 15,
	},
	label: {
		...TextStyles({ align: 'left', weight: 'bold' }).regular,
	},
	value: {
		...TextStyles({ align: 'left' }).regular,
	},
});

export default CategoryInfo;
