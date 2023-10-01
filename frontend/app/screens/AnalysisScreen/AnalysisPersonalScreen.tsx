import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { useFocusEffect } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';

import PersonalChartLegendItem from '../../components/AnalysisScreen/PersonalChartLegendItem';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { personalListItem } from '../../model/analysis';
import { AnalysisCategoryScreenProps } from '../../model/tripNavigator';
import { CurTripInfoState } from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';

const charColor = ['#91C0EB', '#62D4F5', '#41E3EC', '#51EFD4', '#83F7B2', '#BCFA8D', '#F9F871'];

interface charData {
	name: string;
	money: number;
	color: string;
	legendFontColor: string;
	legendFontSize: number;
}

function AnalysisPersonalScreen({ navigation, route }: AnalysisCategoryScreenProps) {
	const curTripInfo = useRecoilValue(CurTripInfoState);
	const { member_uuid, title } = route.params;
	const [paymentData, setPaymentData] = useState<charData[]>([]);
	const [list, setList] = useState<any[]>([]);
	console.log('AnalysisPersonalScreen');

	const api = useAxiosWithAuth();
	useFocusEffect(
		useCallback(() => {
			navigation.setOptions({ title: title + '님의 카테고리 별 지출' });
			getPersonalData();
		}, [member_uuid]),
	);

	const getPersonalData = async () => {
		const res = await api.get(`/analysis/${curTripInfo.id}/${member_uuid}`);
		console.log(res.data);

		const data: charData[] = res.data.list.map((item: any, index: number) => ({
			name: item.category_id,
			money: item.money,
			color: `${charColor[index]}`,
			legendFontColor: '#7F7F7F',
			legendFontSize: 15,
		}));

		const listData: personalListItem[] = res.data.list.map(
			(item: personalListItem, index: number) => ({
				category_id: item.category_id,
				category_type: item.category_type,
				money: item.money,
				percent: item.percent,
				color: `${charColor[index]}`,
			}),
		);

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
		<ScrollView style={styles.viewContainer}>
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
			<View style={{ height: 400 }}>
				{list.map((item) => (
					<PersonalChartLegendItem
						key={item.category_id}
						category_id={item.category_id}
						category_type={item.category_type}
						money={item.money}
						percent={item.percent}
						color={item.color}
						member_uuid={member_uuid}
						navigation={navigation}
					/>
				))}
			</View>
		</ScrollView>
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

export default AnalysisPersonalScreen;
