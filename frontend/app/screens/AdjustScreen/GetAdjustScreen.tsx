import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';

import PaymentItem from '../../components/Adjust/PaymentItem';
import DashLine from '../../components/DashLine';
import Line from '../../components/Line';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { responseList } from '../../model/adjust';
import { GetAdjustScreenProps } from '../../model/tripNavigator';
import { TextStyles } from '../../styles/CommonStyles';

const GetAdjustScreen = ({ navigation, route }: GetAdjustScreenProps) => {
	const [responseAdjust, setResponseAdjust] = useState<responseList>();
	const { adjustId, requesterName } = route.params;

	const api = useAxiosWithAuth();

	useFocusEffect(
		React.useCallback(() => {
			const fetchData = async () => {
				try {
					console.log(adjustId);
					const res = await api.get(`calculate/receive-detail/${adjustId}`);
					if (res.status === 200) {
						console.log(res.data);
						setResponseAdjust(res.data);
						console.log(responseAdjust);
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
			<View style={{ paddingHorizontal: 15 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text
						style={{
							...TextStyles({ align: 'left', weight: 'bold', color: '#91C0EB' }).header,
						}}
					>
						{requesterName}
					</Text>
					<Text
						style={{
							...TextStyles({ align: 'left', weight: 'bold' }).header,
						}}
					>
						님이 요청한
					</Text>
				</View>
				<Text style={TextStyles({ align: 'left', weight: 'bold', mBottom: 20 }).header}>
					정산 상세 내역입니다.
				</Text>
				<DashLine />
			</View>
			<View style={{ paddingHorizontal: 15, flex: 1 }}>
				<View style={{ marginVertical: 10 }}>
					<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
						<Text style={TextStyles({ align: 'left', weight: 'bold' }).title}>
							{responseAdjust?.travel_name}
						</Text>
						<Text style={TextStyles({ align: 'left', color: '#666666' }).small}>
							{responseAdjust?.travel_type}
						</Text>
					</View>
					<Text style={TextStyles({ align: 'left', color: '#666666' }).small}>
						{responseAdjust?.request_date}
					</Text>
				</View>
				{/* <Text style={{ ...TextStyles({ align: 'left' }).small }}>9월 1일</Text>
				<Line marginVertical={10} /> */}
				<FlatList
					data={responseAdjust?.detail_list}
					renderItem={({ item }) => (
						<PaymentItem
							my_amount={item.my_amount}
							all_amount={item.all_amount}
							payment_date={item.payment_date}
							payment_name={item.payment_name}
						/>
					)}
				/>
			</View>
			<View>
				<View style={{ marginHorizontal: 15 }}>
					<DashLine />
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginVertical: 10,
						}}
					>
						<Text style={{ ...TextStyles().regular }}>합계</Text>
						<Text
							style={{
								...TextStyles({ color: '#91C0EB', align: 'right', weight: 'bold' }).title,
								flex: 1,
							}}
						>
							-{responseAdjust?.total_amount}원
						</Text>
					</View>
				</View>
				<View style={{ flexDirection: 'row', marginVertical: 20, marginHorizontal: 15 }}>
					<Button
						mode="contained"
						buttonColor="#E6E6E6"
						textColor="#A0A0A0"
						style={{ flex: 1, marginHorizontal: 5 }}
						onPress={() => console.log('Pressed')}
					>
						반려
					</Button>
					<Button
						mode="contained"
						buttonColor="#91C0EB"
						textColor="white"
						style={{ flex: 1, marginHorizontal: 5 }}
						onPress={() => navigation.navigate('PayAdjust')}
					>
						정산
					</Button>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	viewContainer: {
		flexGrow: 1,
		// justifyContent: 'center',
		// alignItems: 'center',

		backgroundColor: 'white',
	},
});
export default GetAdjustScreen;
