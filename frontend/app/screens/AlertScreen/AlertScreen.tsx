import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type TripStackProp = BottomTabScreenProps<MainTabsProps, 'TripStack'>;
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { AlertItem } from '../../model/alert';
import { MainTabsProps } from '../../navigation/MainTabs';
import { TripStackProps } from '../../navigation/TripStack';
import { TextStyles } from '../../styles/CommonStyles';

function AlertScreen({ navigation }: any) {
	const [alertList, setAlertList] = useState<AlertItem[]>([]);
	useFocusEffect(
		useCallback(() => {
			getAlertList();
		}, []),
	);

	const api = useAxiosWithAuth();
	const getAlertList = async () => {
		try {
			const res = await api.get(`/notification`);

			if (res.status === 200) {
				console.log('getAlertList ', res.data);
				setAlertList(res.data);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	return (
		<View style={styles.viewContainer}>
			{/* <Text>💜❤️💛💚💙</Text> */}
			{/* <View style={{ backgroundColor: 'white', paddingHorizontal: 15, width: '100%' }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={TextStyles().small}>💜</Text>
					<Text style={TextStyles({ mLeft: 5 }).small}>정산</Text>
					<Text style={{ ...TextStyles({ align: 'right', color: '#A0A0A0' }).small, flex: 1 }}>
						9월 5일
					</Text>
				</View>
				<View>
					<Text style={TextStyles({ align: 'left', mLeft: 20, mTop: 10, mBottom: 10 }).regular}>
						박싸피님이 80000원을 요청했어요. 정산 내역을 확인해보세요
					</Text>
				</View>
			</View>
			<View style={{ backgroundColor: 'white', paddingHorizontal: 15, width: '100%' }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={TextStyles().small}>💙</Text>
					<Text style={TextStyles({ mLeft: 5 }).small}>이체</Text>
					<Text style={{ ...TextStyles({ align: 'right', color: '#A0A0A0' }).small, flex: 1 }}>
						9월 5일
					</Text>
				</View>
				<View>
					<Text style={TextStyles({ align: 'left', mLeft: 20, mTop: 10, mBottom: 10 }).regular}>
						선택한 계좌의 잔액이 부족해요. {'\n'}SSS뱅크 111-1538--1234575
					</Text>
				</View>
			</View>
			<View style={{ backgroundColor: 'white', paddingHorizontal: 15, width: '100%' }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={TextStyles().small}>💛</Text>
					<Text style={TextStyles({ mLeft: 5 }).small}>더치페이</Text>
					<Text style={{ ...TextStyles({ align: 'right', color: '#A0A0A0' }).small, flex: 1 }}>
						9월 5일
					</Text>
				</View>
				<View>
					<Text style={TextStyles({ align: 'left', mLeft: 20, mTop: 10, mBottom: 10 }).regular}>
						김싸피님, 최싸피님이 'KTX'결제 건에 태그했어요! 어떤 내역인지 확인해보세요.
					</Text>
				</View>
			</View> */}
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 10,
		paddingHorizontal: 15,
		backgroundColor: 'white',
	},
});

export default AlertScreen;
