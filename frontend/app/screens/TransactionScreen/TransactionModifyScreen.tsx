import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Text, TextInput } from 'react-native-paper';

import AntIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { TextStyles } from '../../styles/CommonStyles';

function TransactionModifyScreen() {
	const [country, setCountry] = useState('');
	const [showDropDown, setShowDropDown] = useState(false);
	const [number, onChangeNumber] = React.useState('');
	const [exNumber, setExNumber] = useState('');
	const [exRate, setExRate] = useState(900);
	const [text, setText] = useState('');
	const [openDate, setOpenDate] = useState(false);
	const [date, setDate] = useState(null);
	const [dateList, setDateList] = useState([
		{
			label: '2023-09-19',
			value: '2023-09-19',
		},
		{
			label: '2023-09-20',
			value: '2023-09-20',
		},
	]);

	return (
		<View style={styles.container}>
			<View style={styles.header_button}>
				<AntIcon name="close" size={30} color="#900" />
				<MIcon name="dots-horizontal" size={30} color="#900" />
			</View>
			<View style={styles.amount_container}>
				<Text style={TextStyles({ align: 'left' }).small}>krw(원)</Text>
				<Text style={TextStyles({ align: 'left' }).header}>50000</Text>
			</View>
			<View style={styles.date_box}>
				<Text style={TextStyles({ align: 'left' }).medium}>날짜 선택</Text>
				<DropDownPicker
					open={openDate}
					value={date}
					items={dateList}
					setOpen={setOpenDate}
					setValue={setDate}
					setItems={setDateList}
					textStyle={TextStyles().medium}
					placeholder="날짜"
					style={styles.selectInput}
				/>
			</View>
			<View style={styles.memo_box}>
				<Text style={TextStyles({ align: 'left' }).medium}>메모</Text>
				<TextInput
					value={text}
					onChangeText={(memo) => {
						setText(memo);
						console.log(text);
					}}
					returnKeyType="next"
				/>
			</View>
			<View style={styles.category_box}>
				<Text style={TextStyles({ align: 'left' }).medium}>카테고리</Text>
			</View>
			<ScrollView>
				<View style={styles.party_box}>
					<Text style={TextStyles({ align: 'left' }).medium}>함께 한 사람</Text>
				</View>
				<View style={styles.self_check}>
					<Text>asd</Text>
					<Text>asd</Text>
					<Text>asd</Text>
				</View>
			</ScrollView>
		</View>
	);
}
const styles = StyleSheet.create({
	selectInput: {
		borderWidth: 0,
		borderBottomWidth: 1,
		marginBottom: 20,
	},
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
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	container: {
		flexDirection: 'column',
		paddingHorizontal: 15,
		paddingTop: 15,
		flexGrow: 1,
	},
	amount_container: {
		flex: 3,
		padding: 30,
		backgroundColor: '#F6F6F6',
	},

	date_box: {
		flex: 2,
		justifyContent: 'flex-start',
		backgroundColor: 'blue',
	},
	memo_box: {
		flex: 2,
		justifyContent: 'flex-start',
	},
	category_box: {
		backgroundColor: 'orange',
		flex: 2,
	},
	party_box: {
		flex: 3,
		backgroundColor: 'gray',
	},
	self_check: {
		flex: 1,
		backgroundColor: 'green',
	},
});
export default TransactionModifyScreen;
