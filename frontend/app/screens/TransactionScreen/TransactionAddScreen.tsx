import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Text } from 'react-native-paper';

import AntIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { TextStyles } from '../../styles/CommonStyles';

function TransactionAddScreen() {
	const [country, setCountry] = useState('');
	const [showDropDown, setShowDropDown] = useState(false);
	const [number, onChangeNumber] = React.useState('');
	const [exNumber, setExNumber] = useState('');
	const [exRate, setExRate] = useState(900);
	const countryList = [
		{
			label: '가나',
			value: 'GHS',
		},
		{
			label: '과아나',
			value: 'GYD',
		},
		{
			label: '과테말라',
			value: 'GTQ',
		},
	];
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.header_button}>
				<AntIcon name="close" size={30} color="#900" />
				<MIcon name="dots-horizontal" size={30} color="#900" />
			</View>
			<View style={styles.ex_rate_container}>
				<View style={styles.ex_rate_box}>
					<View style={styles.before_ex_block}>
						{/* <DropDownPicker
				open={openTripType}
				value={tripType}
				items={tripTypeItems}
				setOpen={setOpenTripType}
				setValue={setTripType}
				setItems={setTripTypeItems}
				style={styles.selectInput}
				textStyle={styles.text}
				placeholder="선택해 주세요"
				zIndex={3000}
				zIndexInverse={1000}
			/> */}
						<TextInput
							value={number}
							placeholder="금액"
							onChangeText={onChangeNumber}
							keyboardType="numeric"
						/>

						<Text>100엔</Text>
					</View>
					<View style={styles.after_ex_block}>
						<Text style={TextStyles().small}>100엔당</Text>
						<Text style={TextStyles().title}>{exRate} 원</Text>
						<Text style={TextStyles().small}>현재 환율 적용</Text>
					</View>
				</View>
			</View>
			<View style={styles.date_box}></View>
			<View style={styles.memo_box}></View>
			<View style={styles.category_box}></View>
			<View style={styles.party_box}></View>
			<View style={styles.self_check}></View>
			<Button>asd</Button>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	after_ex_block: {
		flexDirection: 'column',
		padding: 4,
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		margin: 20,
	},
	before_ex_block: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		padding: 4,
		margin: 20,
	},
	header_button: {
		backgroundColor: 'orange',
		justifyContent: 'space-between',
		flexDirection: 'row',
		padding: 10,
		flex: 1,
	},
	container: {
		flexDirection: 'column',
		flexGrow: 1,
	},
	ex_rate_container: {
		flex: 3,
		padding: 20,
	},
	ex_rate_box: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'gray',
		padding: 20,
	},
	date_box: {
		flex: 1,
		backgroundColor: 'blue',
	},
	memo_box: {
		flex: 1,
		backgroundColor: 'pink',
	},
	category_box: {
		flex: 1,
		backgroundColor: 'orange',
	},
	party_box: {
		flex: 3,
		backgroundColor: 'black',
	},
	self_check: {
		flex: 1,
		backgroundColor: 'green',
	},
});
export default TransactionAddScreen;
