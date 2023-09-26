import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';

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
			<ScrollView style={{ paddingHorizontal: 15, flex: 1 }}>
				<View style={{ marginVertical: 10 }}>
					<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
						<Text style={TextStyles({ align: 'left', weight: 'bold' }).title}>부산 호캉스</Text>
						<Text style={TextStyles({ align: 'left', color: '#666666' }).small}> 국내</Text>
					</View>
					<Text style={TextStyles({ align: 'left', color: '#666666' }).small}>2023.09.03</Text>
				</View>
				<View style={{ marginVertical: 10 }}>
					<Text style={{ ...TextStyles({ align: 'left' }).small }}>9월 1일</Text>
					<Line marginVertical={10} />
					<View style={{ flexDirection: 'row', marginBottom: 5, marginHorizontal: 5 }}>
						<View>
							<Text style={TextStyles({ align: 'left' }).regular}>개미집</Text>
							<Text style={TextStyles({ align: 'left', color: '#666666' }).small}>21:17</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={TextStyles({ align: 'right', weight: 'bold' }).regular}>-12,500</Text>
							<Text style={TextStyles({ align: 'right', color: '#A0A0A0' }).regular}>-78,500</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', marginBottom: 5, marginHorizontal: 5 }}>
						<View>
							<Text style={TextStyles({ align: 'left' }).regular}>낙곱새 남포점</Text>
							<Text style={TextStyles({ align: 'left', color: '#666666' }).small}>23:46</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={TextStyles({ align: 'right', weight: 'bold' }).regular}>-20,000</Text>
							<Text style={TextStyles({ align: 'right', color: '#A0A0A0' }).regular}>-60,000</Text>
						</View>
					</View>
				</View>
			</ScrollView>
			<View
				style={{
					marginHorizontal: 15,
				}}
			>
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
							...TextStyles({ color: '#91C0EB', align: 'right', weight: 'bold' }).regular,
							flex: 1,
						}}
					>
						150,525원
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'row', marginVertical: 20, marginHorizontal: 15 }}>
				<Button
					mode="elevated"
					textColor="#A0A0A0"
					style={{ flex: 1, marginHorizontal: 5 }}
					onPress={() => console.log('Pressed')}
				>
					반려
				</Button>
				<Button
					mode="elevated"
					buttonColor="#91C0EB"
					textColor="white"
					style={{ flex: 1, marginHorizontal: 5 }}
					onPress={() => navigation.navigate('PayAdjust')}
				>
					정산
				</Button>
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
