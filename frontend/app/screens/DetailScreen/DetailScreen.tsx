import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Text } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';

import DetailListItem from '../../components/DetailList/DetailListItem';
import { TextStyles } from '../../styles/CommonStyles';
function DetailScreen() {
	interface OrderTypeSelectItem {
		label: string;
		value: string;
	}
	const [openOrderType, setOpenOrderType] = useState(false);
	const [orderType, setOrderType] = useState('');
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
					<Button style={styles.button} mode="outlined" onPress={() => console.log('Pressed')}>
						정산 현황
					</Button>
					<Button style={styles.button} mode="outlined" onPress={() => console.log('Pressed')}>
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
					<Text style={TextStyles().title}>부산 호캉스</Text>
					<Text style={[TextStyles().small, styles.type]}>국내</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignContent: 'flex-end',
						flexWrap: 'wrap',
					}}
				>
					<Text style={TextStyles().regular}>2023.09.01~2023.09.03</Text>
				</View>
			</View>
			<View style={styles.party_box}>
				<Icon name="face" size={30} color="green" />
				<Icon name="face" size={30} color="green" />
				<Button
					icon="plus"
					style={styles.button}
					mode="outlined"
					onPress={() => console.log('Pressed')}
				>
					일행 추가
				</Button>
			</View>
			<View style={styles.center_box}>
				<Text style={[TextStyles().small, styles.end_date]}>9.1금까지</Text>
				<Text style={[TextStyles().header, styles.balance]}>500,00원</Text>
			</View>
			<View style={styles.body_button_group}>
				<Button
					icon="plus"
					style={styles.button}
					mode="outlined"
					onPress={() => console.log('Pressed')}
				>
					내역 추가
				</Button>
				<Button style={styles.button} mode="outlined" onPress={() => console.log('Pressed')}>
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
				textStyle={TextStyles().medium}
				placeholder="정렬 순서"
				style={styles.selectInput}
			/>
			<ScrollView>
				<View style={styles.detail_item_box}>
					<Text>여행 준비</Text>
					<DetailListItem
						title={'런던 센텀 호텔'}
						time={'21:17'}
						balance={300000}
						party={'김싸피, 이싸피, 김호피'}
						abroad={false}
					/>
				</View>
				<View style={styles.detail_item_box}>
					<Text>여행 준비</Text>
					<DetailListItem
						title={'런던 센텀 호텔'}
						time={'21:17'}
						balance={300000}
						party={'김싸피, 이싸피, 김호피'}
						abroad={false}
					/>
				</View>
				<View style={styles.detail_item_box}>
					<Text>여행 준비</Text>
					<DetailListItem
						title={'런던 센텀 호텔'}
						time={'21:17'}
						balance={300000}
						party={'김싸피, 이싸피, 김호피'}
						abroad={false}
					/>
				</View>
				<View style={styles.detail_item_box}>
					<Text>여행 준비</Text>
					<DetailListItem
						title={'런던 센텀 호텔'}
						time={'21:17'}
						balance={300000}
						party={'김싸피, 이싸피, 김호피'}
						abroad={false}
					/>
				</View>
				<View style={styles.detail_item_box}>
					<Text>여행 준비</Text>
					<DetailListItem
						title={'런던 센텀 호텔'}
						time={'21:17'}
						balance={300000}
						party={'김싸피, 이싸피, 김호피'}
						abroad={false}
					/>
				</View>
				<View style={styles.detail_item_box}>
					<Text>여행 준비</Text>
					<DetailListItem
						title={'런던 센텀 호텔'}
						time={'21:17'}
						balance={300000}
						party={'김싸피, 이싸피, 김호피'}
						abroad={false}
					/>
				</View>
				<View style={styles.detail_item_box}>
					<Text>여행 준비</Text>
					<DetailListItem
						title={'런던 센텀 호텔'}
						time={'21:17'}
						balance={300000}
						party={'김싸피, 이싸피, 김호피'}
						abroad={false}
					/>
				</View>
				<View style={styles.detail_item_box}>
					<Text>여행 준비</Text>
					<DetailListItem
						title={'런던 센텀 호텔'}
						time={'21:17'}
						balance={300000}
						party={'김싸피, 이싸피, 김호피'}
						abroad={false}
					/>
				</View>
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
		borderBottomWidth: 1,
		marginBottom: 20,
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
export default DetailScreen;
