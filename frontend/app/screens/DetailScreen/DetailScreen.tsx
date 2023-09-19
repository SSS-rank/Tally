import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import Icon from 'react-native-vector-icons/MaterialIcons';

import DetailListItem from '../../components/DetailList/DetailListItem';
import { TextStyles } from '../../styles/CommonStyles';

function DetailScreen() {
	const [showDropDown, setShowDropDown] = useState(false);
	const [order, setOrder] = useState('');
	const orderList = [
		{
			label: '최신순',
			value: '최신순',
		},
		{
			label: '오래된 순',
			value: '오래된 순',
		},
	];
	return (
		<View
			style={[
				styles.container,
				{
					flexDirection: 'column',
				},
			]}
		>
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

			<View style={{ flex: 8, backgroundColor: 'orange' }}>
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
					<Button
						icon="plus"
						style={styles.button}
						mode="outlined"
						onPress={() => console.log('Pressed')}
					>
						정산하기
					</Button>
				</View>
				<DropDown
					mode="outlined"
					value={order}
					setValue={setOrder}
					list={orderList}
					visible={showDropDown}
					showDropDown={() => setShowDropDown(true)}
					onDismiss={() => setShowDropDown(false)}
					dropDownStyle={{
						width: '100%',
					}}
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
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	center_box: {
		flexDirection: 'column',
		alignItems: 'center',
		padding: 20,
	},
	end_date: {
		alignItems: 'center',
	},
	party_box: {
		backgroundColor: 'white',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		paddingHorizontal: 5,
	},
	title_box: {
		padding: 10,
	},
	detail_item_box: {
		padding: 10,
	},
	body_button_group: {
		paddingLeft: 30,
		paddingRight: 30,
		backgroundColor: 'red',
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
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	container: {
		flex: 1,
	},
});
export default DetailScreen;
