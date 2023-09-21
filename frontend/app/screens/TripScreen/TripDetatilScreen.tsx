import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Text } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DetailListItem from '../../components/DetailList/DetailListItem';
import { PaymentStackProps } from '../../navigation/PaymentStack';
import { TripStackProps } from '../../navigation/TripStack';
import { TextStyles } from '../../styles/CommonStyles';

type TripDetailScreenProps = NativeStackScreenProps<TripStackProps, 'TripDetail'>;

function TripDetailScreen({ navigation, route }: TripDetailScreenProps) {
	interface OrderTypeSelectItem {
		label: string;
		value: string;
	}
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
	const day = currentDate.getDate();
	const { id, title, location, type, startDay, endDay } = route.params || {};
	const [openOrderType, setOpenOrderType] = useState(false);
	const [orderType, setOrderType] = useState('오래된 순');
	const [orderTypeItems, setOrderTypeItems] = useState<OrderTypeSelectItem[]>([
		{
			label: '최신순',
			value: '최신순',
		},
		{
			label: '오래된 순',
			value: '오래된 순',
		},
	]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Icon name="chevron-left" size={50} color="black" />
				<View style={styles.header_button_group}>
					<Button
						style={styles.button}
						mode="text"
						labelStyle={TextStyles().regular}
						onPress={() => console.log('Pressed')}
					>
						정산 현황
					</Button>
					<Button
						style={styles.button}
						labelStyle={TextStyles().regular}
						mode="text"
						onPress={() => console.log('Pressed')}
					>
						분석
					</Button>
				</View>
			</View>

			<View style={styles.title_box}>
				<View
					style={{
						flexDirection: 'row',
						alignContent: 'flex-end',
						flexWrap: 'wrap',
					}}
				>
					<Text style={TextStyles().title}>{title}</Text>
					<Text style={[TextStyles().small, styles.type]}>{location}</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignContent: 'flex-end',
						flexWrap: 'wrap',
					}}
				>
					<Text style={TextStyles().regular}>
						{startDay}~{endDay}
					</Text>
				</View>
			</View>
			<View style={styles.party_box}>
				<Icon name="face" size={30} color="green" />
				<Icon name="face" size={30} color="green" />
				<Button
					icon="plus"
					style={styles.button}
					mode="text"
					labelStyle={TextStyles().regular}
					onPress={() => console.log('Pressed')}
				>
					일행 추가
				</Button>
			</View>
			<View style={styles.center_box}>
				<Text style={[TextStyles().small, styles.end_date]}>
					현재 날짜: {year}-{month}-{day}
				</Text>
				<Text style={[TextStyles().header, styles.balance]}>500,00원</Text>
			</View>
			<View style={styles.body_button_group}>
				<Button
					icon="plus"
					style={styles.button}
					labelStyle={TextStyles().regular}
					mode="text"
					onPress={() => navigation.navigate('AddPayment')}
				>
					내역 추가
				</Button>
				<Button
					style={styles.button}
					labelStyle={TextStyles().regular}
					mode="text"
					onPress={() => console.log('Pressed')}
				>
					정산
				</Button>
			</View>
			<DropDownPicker
				open={openOrderType}
				value={orderType}
				items={orderTypeItems}
				setOpen={setOpenOrderType}
				setValue={setOrderType}
				setItems={setOrderTypeItems}
				textStyle={TextStyles().small}
				placeholder={orderType}
				style={styles.selectInput}
			/>
			<ScrollView>
				<TouchableOpacity style={styles.detail_item_box}>
					<Text>여행 준비</Text>
					<DetailListItem
						title={'런던 센텀 호텔'}
						time={'21:17'}
						balance={300000}
						party={'김싸피, 이싸피, 김호피'}
						abroad={false}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.detail_item_box}>
					<Text>여행 준비</Text>
					<DetailListItem
						title={'런던 센텀 호텔'}
						time={'21:17'}
						balance={300000}
						party={'김싸피, 이싸피, 김호피'}
						abroad={false}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.detail_item_box}>
					<Text>여행 준비</Text>
					<DetailListItem
						title={'런던 센텀 호텔'}
						time={'21:17'}
						balance={300000}
						party={'김싸피, 이싸피, 김호피'}
						abroad={false}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.detail_item_box}>
					<Text>여행 준비</Text>
					<DetailListItem
						title={'런던 센텀 호텔'}
						time={'21:17'}
						balance={300000}
						party={'김싸피, 이싸피, 김호피'}
						abroad={false}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.detail_item_box}>
					<Text>여행 준비</Text>
					<DetailListItem
						title={'런던 센텀 호텔'}
						time={'21:17'}
						balance={300000}
						party={'김싸피, 이싸피, 김호피'}
						abroad={false}
					/>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		paddingTop: 10,
		paddingHorizontal: 15,
		backgroundColor: 'white',
	},
	selectInput: {
		borderWidth: 0,
		borderBottomWidth: 0,
		width: 150,
	},
	center_box: {
		flexDirection: 'column',
		alignItems: 'center',
		padding: 50,
	},
	end_date: {
		alignItems: 'center',
	},
	party_box: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	title_box: {
		padding: 10,
	},
	detail_item_box: {
		padding: 10,
	},
	body_button_group: {
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	balance: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	period: {
		fontSize: 13,
	},
	title: {
		fontSize: 30,
	},
	type: {
		alignSelf: 'flex-end',
	},
	button: {
		padding: 0,
		borderRadius: 20,
		flexWrap: 'wrap',
	},
	header_button_group: {
		flexDirection: 'row',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
export default TripDetailScreen;
