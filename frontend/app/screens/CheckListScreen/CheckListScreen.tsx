import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Chip } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilState } from 'recoil';

import DashLine from '../../components/DashLine';
import CheckListItem from '../../components/HomeScreen/CheckListItem';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { CustomCheckListItem } from '../../model/checkList';
import { CheckListScreenProps } from '../../model/homeNavigator';
import { CheckListState } from '../../recoil/checkListRecoil';
import { TextStyles } from '../../styles/CommonStyles';

function CheckListScreen({ route }: CheckListScreenProps) {
	const { travel_id, travel_title, start_date, end_date } = route.params;
	const [customCheckList, setCustomCheckList] = useRecoilState(CheckListState);
	const api = useAxiosWithAuth();

	useFocusEffect(
		useCallback(() => {
			if (customCheckList[travel_id] === undefined) getCustomCheckList();
		}, []),
	);

	const getCustomCheckList = async () => {
		try {
			const res = await api.get(`/custom-checklist/${travel_id}`);

			if (res.status === 200) {
				const newData: CustomCheckListItem[] = res.data.map((item: any) => ({
					...item,
					status: false,
				}));

				const updatedDefaultCheckList = { ...customCheckList };
				updatedDefaultCheckList[travel_id] = {
					checkListItem: newData,
				};

				setCustomCheckList(updatedDefaultCheckList);
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
			<View style={styles.buttonView}>
				<Chip style={styles.addBtn} textStyle={{ color: '#ffffff' }}>
					<Icon name="plus" size={16} style={{ color: '#ffffff', textAlignVertical: 'center' }} />{' '}
					체크리스트 추가하기
				</Chip>
			</View>
			<FlatList
				data={customCheckList && customCheckList[travel_id]?.checkListItem}
				renderItem={({ item }) => (
					<CheckListItem
						travel_id={travel_id}
						custom_check_list_id={item.custom_check_list_id}
						content={item.content}
						status={item.status}
					/>
				)}
				keyExtractor={(item) => String(item.custom_check_list_id)}
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
	buttonView: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	addBtn: {
		borderColor: '#91C0EB',
		borderRadius: 32,
		padding: 0,
		borderWidth: 1,
		backgroundColor: '#91C0EB',
		width: 'auto',
	},
});
export default CheckListScreen;
