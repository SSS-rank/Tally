import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Text, TextInput, Button, Chip } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../api/api';
import PartyListItem from '../../components/PartyList/PartyListItem';
import { DirectPayMember, DirectPayReq } from '../../model/payment';
import { TripMember } from '../../model/trip';
import { TripStackProps } from '../../navigation/TripStack';
import { TextStyles } from '../../styles/CommonStyles';

type TripDetailScreenProps = NativeStackScreenProps<TripStackProps, 'TripDetail'>;
function PaymentAddScreen({ navigation, route }: TripDetailScreenProps) {
	const [totAmount, setTotAmount] = useState('');
	const [text, setText] = useState('');
	const [store, setStore] = useState('');
	const [selectedcategory, setSelectedCategory] = useState(0);
	const [selfCheck, setSelfCheck] = useState(false);
	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);

	const [partyMembers, setPartyMembers] = useState<DirectPayMember[]>([]); // 결제 멤버
	const [participants, setParticipants] = useState<TripMember[]>([]); // 여행 참여 멤버
	const [directPayReq, setDirectPayReq] = useState<DirectPayReq>({
		amount: 0,
		category: 0,
		memo: '',
		payment_date_time: '',
		payment_participants: [],
		payment_type: '',
		payment_unit_id: 0,
		ratio: 0,
		title: '',
		travel_id: 0,
		visible: false,
	});
	useEffect(() => {
		// route.params에 접근하는 부분
		const { id, type, title, travelParticipants } = route.params;
		setParticipants(travelParticipants);
		const directPayMembers = travelParticipants.map((member: TripMember) => ({
			amount: 0, // 초기값 설정 (원하는 초기값으로 변경)
			member_uuid: member.member_uuid,
		}));
		setPartyMembers(directPayMembers);

		setDirectPayReq((prevState: DirectPayReq) => ({
			...prevState,
			title: title || '',
			travel_id: id || 0,
		}));
		// route.params에 의존하는 추가적인 코드 작성
	}, [route.params]);

	const handleIconClick = (category: number) => {
		setSelectedCategory(category);
	};

	const handleAmountChange = (memberUuid: string, amount: string) => {
		setPartyMembers((prevMemebers) => {
			const updatedAmounts = [...prevMemebers];
			const index = updatedAmounts.findIndex((item) => item.member_uuid === memberUuid);
			if (index !== -1) {
				updatedAmounts[index] = { member_uuid: memberUuid, amount: parseFloat(amount) };
			} else {
				updatedAmounts.push({ member_uuid: memberUuid, amount: parseFloat(amount) });
			}
			return updatedAmounts;
		});
	};

	function formatDate(in_date: Date) {
		const year = in_date.getFullYear();
		const month = String(in_date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
		const day = String(in_date.getDate()).padStart(2, '0'); // 일자를 2자리로 포맷팅
		const hours = String(in_date.getHours()).padStart(2, '0'); // 시간을 2자리로 포맷팅
		const minutes = String(in_date.getMinutes()).padStart(2, '0'); // 분을 2자리로 포맷팅

		return `${year}-${month}-${day} ${hours}:${minutes}`;
	}
	async function handleSubmit() {
		console.log(`금액 : ${totAmount}`);
		console.log(`날짜 : ${date}`);
		console.log(`결제처: ${store}`);
		console.log(`메모: ${text}`);
		console.log(`카테고리:${selectedcategory}`);
		const payReq = {
			payment_participants: participants,
		};
		setDirectPayReq((prevState: DirectPayReq) => ({
			...prevState,
			payment_date_time: formatDate(date),
			payment_type: 'cash',
			payment_unit_id: 8,
			ratio: 1,
			amount: parseFloat(totAmount),
			category: selectedcategory,
			memo: text,
			payment_participants: partyMembers || [],
			visible: !selfCheck,
		}));
		console.log(directPayReq);
		try {
			// console.log(page);
			// console.log(ongoingListState.length);
			const res = await api.post(`/payment/manual`, directPayReq);

			if (res.status === 200) {
				// console.log(res.data);
				console.log(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<ScrollView style={styles.container}>
			<View style={styles.header_button}>
				<AntIcon name="close" size={30} color="#900" />
				<MIcon name="dots-horizontal" size={30} color="#900" />
			</View>

			<View style={styles.amount_container}>
				<Text style={TextStyles({ align: 'left' }).small}>krw(원)</Text>
				<TextInput
					value={totAmount}
					onChangeText={(memo) => {
						setTotAmount(memo);
					}}
					returnKeyType="next"
					keyboardType="numeric"
					style={styles.amountInput}
					selectionColor="#F6F6F6"
				/>
			</View>
			<View style={styles.date_box}>
				<Text style={TextStyles({ align: 'left' }).medium}>날짜 선택</Text>
				<Chip onPress={() => setOpen(true)}>
					{date.getFullYear() +
						'년 ' +
						(date.getMonth() + 1) +
						'월 ' +
						date.getDate() +
						'일 ' +
						date.getHours() +
						'시 ' +
						date.getMinutes() +
						'분 '}
				</Chip>
				<DatePicker
					modal
					open={open}
					date={date}
					onConfirm={(p_date) => {
						setOpen(false);
						setDate(p_date);
					}}
					onCancel={() => {
						setOpen(false);
					}}
				/>
			</View>
			<View style={styles.memo_box}>
				<Text style={TextStyles({ align: 'left' }).medium}>결제처</Text>
				<TextInput
					value={store}
					onChangeText={(memo) => {
						setStore(memo);
					}}
					returnKeyType="next"
					style={styles.textInput}
				/>
			</View>
			<View style={styles.memo_box}>
				<Text style={TextStyles({ align: 'left' }).medium}>메모</Text>
				<TextInput
					value={text}
					onChangeText={(memo) => {
						setText(memo);
					}}
					returnKeyType="next"
					style={styles.textInput}
				/>
			</View>
			<View style={styles.category_box}>
				<Text style={TextStyles({ align: 'left' }).medium}>카테고리</Text>
				<View style={styles.category_line}>
					<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick(1)}>
						<MIcon name="home" size={40} color={selectedcategory === 1 ? '#91C0EB' : 'gray'} />
						<Text style={TextStyles().small}>숙소</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick(2)}>
						<FIcon name="plane" size={40} color={selectedcategory === 2 ? '#91C0EB' : 'gray'} />
						<Text style={TextStyles().small}>항공</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick(3)}>
						<FIcon name="car" size={40} color={selectedcategory === 3 ? '#91C0EB' : 'gray'} />
						<Text style={TextStyles().small}>교통</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick(4)}>
						<MIcon name="ticket" size={40} color={selectedcategory === 4 ? '#91C0EB' : 'gray'} />
						<Text style={TextStyles().small}>관광</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick(5)}>
						<MIcon
							name="silverware-fork-knife"
							size={40}
							color={selectedcategory === 5 ? '#91C0EB' : 'gray'}
						/>
						<Text style={TextStyles().small}>식사</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick(6)}>
						<MIcon name="shopping" size={40} color={selectedcategory === 6 ? '#91C0EB' : 'gray'} />
						<Text style={TextStyles().small}>쇼핑</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.icon_group} onPress={() => handleIconClick(7)}>
						<MIcon
							name="dots-horizontal-circle"
							size={40}
							color={selectedcategory === 7 ? '#91C0EB' : 'gray'}
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
					{participants.map((item) => (
						<PartyListItem
							key={item.member_uuid}
							name={item.member_nickname}
							img={{ uri: item.image }}
							self={selfCheck}
							onAmountChange={(input) => handleAmountChange(item.member_uuid, input)}
						/>
					))}
				</ScrollView>
			</View>

			<View style={styles.self_check_box}>
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
			<Button
				mode="contained" // 버튼 스타일: 'contained' (채워진 스타일) 또는 'outlined' (테두리 스타일)
				dark={true} // 어두운 테마 사용 여부
				compact={true} // 작은 크기의 버튼 여부
				uppercase={false} // 레이블 텍스트 대문자 변환 여부
				onPress={() => handleSubmit()} // 클릭 이벤트 핸들러
				style={{ marginTop: 10, marginBottom: 70 }}
			>
				{' '}
				등록
			</Button>
		</ScrollView>
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
		marginTop: 20,
	},

	textInput: {
		backgroundColor: 'white',
	},
	amountInput: {
		width: 100,
		backgroundColor: 'F6F6F6',
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
		backgroundColor: 'white',
		flex: 1,
	},
	amount_container: {
		flex: 2,
		padding: 30,
		marginTop: 20,
		backgroundColor: '#F6F6F6',
	},

	date_box: {
		flex: 2,
		justifyContent: 'flex-start',
		marginTop: 20,
	},
	category_box: {
		marginTop: 20,
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
	self_check_box: {
		padding: 10,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	submit: {
		paddingBottom: 50,
	},
});
export default PaymentAddScreen;
