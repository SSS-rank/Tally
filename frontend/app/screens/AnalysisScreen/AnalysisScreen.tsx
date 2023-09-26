import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { useFocusEffect } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';

import { listItem } from './../../model/analysis';
import ChartLegendItem from '../../components/AnalysisScreen/ChartLegendItem';
import CustomSwitch from '../../components/CustomSwitch';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { CurTripInfoState, FcmTokenState } from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';

interface charData {
	name: string;
	money: number;
	color: string;
	legendFontColor: string;
	legendFontSize: number;
}

function AnalysisScreen() {
	const curTripInfo = useRecoilValue(CurTripInfoState);
	const [paymentData, setPaymentData] = useState<charData[]>([]);
	const [list, setList] = useState<listItem[]>([]);

	const [selectionMode, setSelectionMode] = useState(1);

	useFocusEffect(
		useCallback(() => {
			getData();
		}, []),
	);

	const api = useAxiosWithAuth();
	const getData = async () => {
		const res = await api.get(`/analysis/${curTripInfo.id}`);
		console.log(res.data);

		const data: charData[] = res.data.list.map((item: any, index: number) => ({
			name: item.member_name,
			money: item.money,
			color: `rgba(131, 167, 234, 1)`,
			legendFontColor: '#7F7F7F',
			legendFontSize: 15,
		}));

		const listData: listItem[] = res.data.list.map((item: listItem) => ({
			member_name: item.member_name,
			money: item.money,
			percent: item.percent,
			login: item.login,
			member_uuid: item.member_uuid,
		}));

		console.log('data ', data);
		setPaymentData(data);
		setList(listData);
	};

	const charConfig = {
		backgroundColor: '#ffffff',
		backgroundGradientFrom: '#fb8c00',
		backgroundGradientTo: '#ffa726',
		decimalPlaces: 2, // optional, defaults to 2dp
		color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		style: {
			borderRadius: 16,
		},
		propsForDots: {
			r: '6',
			strokeWidth: '2',
			stroke: '#ffa726',
		},
	};

	return (
		<View style={styles.viewContainer}>
			<View style={styles.topView}>
				<View style={styles.top}>
					<Text style={styles.title}>{curTripInfo.title}</Text>
					<Text style={styles.info}>{curTripInfo.location}</Text>
				</View>
				<Text style={styles.info}>
					{curTripInfo.startDay} ~ {curTripInfo.endDay}
				</Text>
			</View>
			<View style={styles.chartView}>
				<PieChart
					data={paymentData}
					width={Dimensions.get('window').width}
					height={280}
					backgroundColor="transparent"
					chartConfig={charConfig}
					accessor={'money'}
					paddingLeft={'20'}
					hasLegend={false}
				/>
			</View>
			<FlatList
				data={list}
				renderItem={({ item }) => (
					<ChartLegendItem
						key={item.member_uuid}
						member_name={item.member_name}
						member_uuid={item.member_uuid}
						money={item.money}
						percent={item.percent}
						login={item.login}
					/>
				)}
				keyExtractor={(item) => item.member_uuid}
			/>
			<View style={styles.switchView}>
				<CustomSwitch
					selectionMode={1}
					roundCorner={true}
					option1={'그룹'}
					option2={'개인'}
					onSelectSwitch={setSelectionMode}
					selectionColor={'#91C0EB'}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		padding: 15,
		backgroundColor: '#ffffff',
	},
	topView: {},
	top: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginBottom: 5,
	},
	title: {
		...TextStyles({ align: 'left', weight: 'bold', mRight: 5 }).title,
	},
	info: {
		...TextStyles({ align: 'left', color: '#666666' }).small,
	},
	chartView: {
		// backgroundColor: 'blue',
		position: 'relative',
		left: 80,
	},
	switchView: {
		alignItems: 'center',
		margin: 20,
		position: 'absolute',
		bottom: 0,
		alignSelf: 'center',
	},
});

export default AnalysisScreen;
