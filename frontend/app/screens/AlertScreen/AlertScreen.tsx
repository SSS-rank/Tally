import React, { useCallback, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';

import AlertListItem from '../../components/AlertScreen/AlertListItem';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { AlertItem } from '../../model/alert';
import { alertCheckState } from '../../recoil/alertRecoil';

function AlertScreen() {
	const setAlertCheck = useSetRecoilState(alertCheckState);
	const [alertList, setAlertList] = useState<AlertItem[]>([]);
	useFocusEffect(
		useCallback(() => {
			getAlertList();
			setAlertCheck(false);
		}, []),
	);

	const api = useAxiosWithAuth();
	const getAlertList = async () => {
		try {
			const res = await api.get(`/notification`);

			if (res.status === 200) {
				setAlertList(res.data);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	return (
		<ScrollView style={styles.viewContainer}>
			{alertList.reverse().map((item: AlertItem, index: number) => (
				<AlertListItem key={index} item={item} />
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		paddingTop: 10,
		paddingHorizontal: 15,
		backgroundColor: 'white',
	},
});

export default AlertScreen;
