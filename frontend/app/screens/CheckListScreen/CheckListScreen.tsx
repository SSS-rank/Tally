import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';

import DashLine from '../../components/DashLine';
import CheckListItem from '../../components/HomeScreen/CheckListItem';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { DefaultCheckListItem } from '../../model/checkList';
import { CheckListScreenProps } from '../../model/homeNavigator';
import { TextStyles } from '../../styles/CommonStyles';

function CheckListScreen({ route }: CheckListScreenProps) {
	const { travel_title, start_date, end_date } = route.params;
	const [defaultCheckList, setDefaultCheckList] = useState<DefaultCheckListItem[]>([]);
	const api = useAxiosWithAuth();

	useFocusEffect(
		useCallback(() => {
			getDefaultCheckList();
		}, []),
	);

	const getDefaultCheckList = async () => {
		try {
			const res = await api.get(`/default-checklist`);

			if (res.status === 200) {
				setDefaultCheckList(res.data);
			}
		} catch (err: any) {
			console.error(err);
		}
	};
	return (
		<View style={styles.viewContainer}>
			<View style={styles.topView}>
				<Text style={styles.title}>{travel_title}</Text>
				<Text style={styles.date}>
					{start_date} ~ {end_date}
				</Text>
			</View>

			<DashLine />
			<FlatList
				data={defaultCheckList}
				renderItem={({ item }) => (
					<CheckListItem
						default_check_list_id={item.default_check_list_id}
						content={item.content}
					/>
				)}
				keyExtractor={(item) => String(item.default_check_list_id)}
			/>
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
