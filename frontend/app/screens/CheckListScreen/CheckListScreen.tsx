import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import DashLine from '../../components/DashLine';
import CheckListItem from '../../components/HomeScreen/CheckListItem';
import { CheckListScreenProps } from '../../model/homeNavigator';
import { TextStyles } from '../../styles/CommonStyles';

function CheckListScreen({ route }: CheckListScreenProps) {
	const { travel_title, start_date, end_date } = route.params;
	return (
		<View style={styles.viewContainer}>
			<View style={styles.topView}>
				<Text style={styles.title}>{travel_title}</Text>
				<Text style={styles.date}>
					{start_date} ~ {end_date}
				</Text>
			</View>

			<DashLine />
			<CheckListItem />
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		padding: 15,
		backgroundColor: '#ffffff',
	},
	topView: {
		marginBottom: 20,
	},
	title: {
		...TextStyles({ align: 'left', weight: 'bold', mBottom: 5 }).header,
	},
	date: {
		...TextStyles({ align: 'left', color: '#A0A0A0' }).small,
	},
});
export default CheckListScreen;
