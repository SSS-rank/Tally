import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Checkbox, Text, TextInput, Button } from 'react-native-paper';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomDropDown from '../../components/DropDown/CustomDropDown';
import PartyListItem from '../../components/PartyList/PartyListItem';
import { TextStyles } from '../../styles/CommonStyles';

function TransactionModifyScreen() {
	const [text, setText] = useState('');
	const [openDate, setOpenDate] = useState(false);
	const [date, setDate] = useState('');
	const [selectedcategory, setSelectedCategory] = useState('');
	const [checked, setChecked] = useState(false);
	const [selfCheck, setSelfCheck] = useState(false);
	// const [party, setParty] = useState('')
	const [dateList, setDateList] = useState([
		{
			label: '2023-09-19',
			value: '2023-09-19',
		},
		{
			label: '2023-09-20',
			value: '2023-09-20',
		},
		{
			label: '2023-09-21',
			value: '2023-09-21',
		},
		{
			label: '2023-09-22',
			value: '2023-09-22',
		},
	]);
	const handleIconClick = (category: string) => {
		setSelectedCategory(category);
	};

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
				<CustomDropDown
					open={openDate}
					value={date}
					items={dateList}
					setOpen={setOpenDate}
					setValue={setDate}
					setItems={setDateList}
					zIndex={10000}
				/>
			</View>
			<ScrollView>
				<View style={styles.memo_box}>
					<Text style={TextStyles({ align: 'left' }).medium}>메모</Text>
					<TextInput
						value={text}
						onChangeText={(memo) => {
							setText(memo);
							console.log(text);
						}}
						returnKeyType="next"
						style={styles.textInput}
					/>
				</View>
				<View style={styles.memo_box}>
					<Text style={TextStyles({ align: 'left' }).medium}>결제처</Text>
					<TextInput
						value={text}
						onChangeText={(memo) => {
							setText(memo);
							console.log(text);
						}}
						returnKeyType="next"
						style={styles.textInput}
					/>
				</View>
				<View style={styles.category_box}>
					<Text style={TextStyles({ align: 'left' }).medium}>카테고리</Text>
					<View style={styles.category_line}>
						<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick('숙소')}>
							<MIcon
								name="home"
								size={40}
								color={selectedcategory === '숙소' ? '#91C0EB' : 'gray'}
							/>
							<Text style={TextStyles().small}>숙소</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick('항공')}>
							<FIcon
								name="plane"
								size={40}
								color={selectedcategory === '항공' ? '#91C0EB' : 'gray'}
							/>
							<Text style={TextStyles().small}>항공</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick('교통')}>
							<FIcon
								name="car"
								size={40}
								color={selectedcategory === '교통' ? '#91C0EB' : 'gray'}
							/>
							<Text style={TextStyles().small}>교통</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick('관광')}>
							<MIcon
								name="ticket"
								size={40}
								color={selectedcategory === '관광' ? '#91C0EB' : 'gray'}
							/>
							<Text style={TextStyles().small}>관광</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick('식비')}>
							<MIcon
								name="silverware-fork-knife"
								size={40}
								color={selectedcategory === '식비' ? '#91C0EB' : 'gray'}
							/>
							<Text style={TextStyles().small}>식비</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick('쇼핑')}>
							<MIcon
								name="shopping"
								size={40}
								color={selectedcategory === '쇼핑' ? '#91C0EB' : 'gray'}
							/>
							<Text style={TextStyles().small}>쇼핑</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick('기타')}>
							<MIcon
								name="dots-horizontal-circle"
								size={40}
								color={selectedcategory === '기타' ? '#91C0EB' : 'gray'}
							/>
							<Text style={TextStyles().small}>기타</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View
					style={[
						styles.party_box,
						selfCheck ? { backgroundColor: 'gray', pointerEvents: 'none' } : null,
					]}
				>
					<Text style={TextStyles({ align: 'left' }).medium}>함께 한 사람</Text>
					<ScrollView>
						<PartyListItem
							name="김싸피"
							img={require('../../assets/images/kakao.png')}
							self={selfCheck}
						/>

						<PartyListItem
							name="김싸피"
							img={require('../../assets/images/kakao.png')}
							self={selfCheck}
						/>
					</ScrollView>
				</View>

				<View style={styles.self_check}>
					<View>
						<Text style={TextStyles({ align: 'left' }).medium}>이 비용 나만보기</Text>
						<Text style={TextStyles({ align: 'left' }).small}>
							일행에게 보이지 않는 비용이며, 정산에서 제외됩니다.
						</Text>
					</View>
					<IIcon
						name={selfCheck ? 'checkmark-circle' : 'checkmark-circle-outline'}
						size={32}
						color="#91C0EB"
						style={{ marginLeft: 5 }}
						onPress={() => {
							setSelfCheck(!selfCheck);
						}}
					/>
				</View>
				<Button> 완료</Button>
			</ScrollView>
		</View>
	);
}
const styles = StyleSheet.create({
	category_line: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		padding: 10,
	},
	icon_group: {
		flexDirection: 'column',
	},
	memo_box: {
		flex: 3,
		justifyContent: 'flex-start',
		marginTop: 20, // TextInput의 상단 여백 조정 (상황에 따라 조절)
	},

	textInput: {
		backgroundColor: 'white',
	},
	selectInput: {
		borderWidth: 0,
		borderBottomWidth: 1,
		marginBottom: 20,
	},

	header_button: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		flex: 1,
	},
	container: {
		flexDirection: 'column',
		paddingHorizontal: 15,
		paddingTop: 15,
		flex: 1,
	},
	amount_container: {
		flex: 2,
		padding: 30,
		backgroundColor: '#F6F6F6',
	},

	date_box: {
		flex: 2,
		justifyContent: 'flex-start',
	},
	category_box: {
		flex: 2,
		flexDirection: 'column',
		paddingBottom: 20,
	},
	party_box: {
		flex: 3,
	},
	check_box_container: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	self_check: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
export default TransactionModifyScreen;
