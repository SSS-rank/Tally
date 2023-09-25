import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import AdjustStatus from '../../components/Adjust/AdjustStatus';
import RequestDetailItem from '../../components/Adjust/RequestDetailItem';
import DashLine from '../../components/DashLine';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { requestList } from '../../model/adjust';
import { SendAdjustScreenProps } from '../../model/tripNavigator';
import { TextStyles } from '../../styles/CommonStyles';

const SendAdjuestScreen = ({ navigation, route }: SendAdjustScreenProps) => {
	const [requestAdjust, setRequestAdjust] = useState<requestList>();
	const { adjustId } = route.params;
	const api = useAxiosWithAuth();

	useFocusEffect(
		React.useCallback(() => {
			const fetchData = async () => {
				try {
					console.log(adjustId);
					const res = await api.get(`calculate/request-detail/${adjustId}`);
					if (res.status === 200) {
						console.log(res.data);
						setRequestAdjust(res.data);
						console.log(requestAdjust);
					}
				} catch (err) {
					console.log(err);
				}
			};

			fetchData(); // 화면이 focus될 때마다 데이터를 가져옴
		}, []),
	);

	return (
		<View style={styles.viewContainer}>
			<View style={{ marginBottom: 20 }}>
				<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
					<Text style={TextStyles({ align: 'left', weight: 'bold' }).header}>
						{requestAdjust?.travel_name}
					</Text>
					<Text style={TextStyles({ align: 'left', color: '#666666' }).small}> 국내</Text>
				</View>
				<Text style={TextStyles({ align: 'left', color: '#666666' }).small}>
					{requestAdjust?.request_date}
				</Text>
			</View>
			<DashLine />
			<View
				style={{
					marginVertical: 20,
				}}
			>
				<FlatList
					data={requestAdjust?.request_details}
					renderItem={({ item }) => (
						<RequestDetailItem member_name={item.member_name} amount={item.amount} />
					)}
				/>
			</View>
			<DashLine />
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					height: 70,
					paddingHorizontal: 10,
				}}
			>
				<Text style={{ ...TextStyles().medium }}>합계</Text>
				<Text
					style={{
						...TextStyles({ color: '#91C0EB', align: 'right', weight: 'bold' }).title,
						flex: 1,
						lineHeight: 70,
					}}
				>
					{requestAdjust?.total_amount}원
				</Text>
			</View>
			<View
				style={{
					paddingHorizontal: 10,
					// justifyContent: 'center',
					alignContent: 'center',
				}}
			>
				<Text style={TextStyles({ align: 'left', mTop: 20, mBottom: 15 }).regular}>
					인원 별 정산 현황
				</Text>
				<FlatList
					data={requestAdjust?.request_details}
					renderItem={({ item }) => (
						<AdjustStatus member_name={item.member_name} status={item.status} />
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	viewContainer: {
		flexGrow: 1,
		paddingHorizontal: 15,
		backgroundColor: 'white',
	},
});
export default SendAdjuestScreen;
