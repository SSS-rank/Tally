import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Text, TextInput, Button, Chip } from 'react-native-paper';

import FIcon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import PartyListItem from '../../components/PartyList/PartyListItem';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import {
	DirectPayReq,
	Payment,
	SelectPayMember,
	ModMember,
	PaymentDetailRes,
} from '../../model/payment';
import { TripMember } from '../../model/trip';
import { ModifyPaymentScreenProps } from '../../model/tripNavigator';
import { TextStyles } from '../../styles/CommonStyles';

function PaymentModifyScreen({ navigation, route }: ModifyPaymentScreenProps) {
	const api = useAxiosWithAuth();
	const [totAmount, setTotAmount] = useState('');
	const [text, setText] = useState('');
	const [selectedcategory, setSelectedCategory] = useState(0);
	const [selfCheck, setSelfCheck] = useState(false);
	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState('');
	const [paymentUnit, setPaymentUnit] = useState('');
	const [isPayer, setIspayer] = useState(false);

	const [partyMembers, setPartyMembers] = useState<SelectPayMember[]>([]); // 결제 멤버
	const [payData, setPayData] = useState<PaymentDetailRes>({
		payment_uuid: '', // 결제 uuid (string)
		category: 0, // 카테고리 id(Long)
		amount: 0, // 결제 총 금액(int)
		payment_date: '', // 결제 시간(String)
		memo: '', // 결제 상세 메모(String)
		payment_unit: '', // 결제 단위(String)
		visible: true, // 공개여부(boolean)
		payment_participants: [],
	});
	useEffect(() => {
		const { payment_uuid, payer } = route.params;
		const my_uuid = '';
		async function fetchData() {
			// if (payer == my_uuid) {
			//본인이 결제자인 경우
			const res = await api.get(`payment/payer/${payment_uuid}`);
			if (res.status === 200) {
				const responseData = res.data;
				// console.log(responseData);
				const extractedData = {
					payment_uuid: responseData.payment_uuid,
					category: responseData.category,
					amount: responseData.amount,
					payment_date: responseData.payment_date,
					memo: responseData.memo,
					payment_unit: responseData.payment_unit,
					visible: responseData.visible,
					payment_participants: responseData.payment_participants.map((participant: ModMember) => ({
						member_uuid: participant.member_uuid,
						amount: participant.amount,
						nickname: participant.nickname,
						profile_image: participant.profile_image,
						payer: participant.payer,
						with: participant.with,
					})),
				};
				setPayData(extractedData);
				// 비동기 처리를 위해 responseData 사용
				setTotAmount(responseData.amount + '');
				setText(responseData.memo);
				setSelectedCategory(responseData.category);
				const memberdata = responseData.payment_participants.map((item: ModMember) => {
					return {
						amount: item.amount,
						member_uuid: item.member_uuid,
						checked: item.with,
						member_nickname: item.nickname,
						image: item.profile_image,
					};
				});
				setPartyMembers(memberdata);
			}

			// } else {
		}
		fetchData();
	}, []);

	const handleIconClick = (category: number) => {
		setSelectedCategory(category);
	};

	const handleInVolveChange = (
		memberUuid: string,
		amount: number,
		checked: boolean,
		memberNickname: string,
		image: string,
	) => {
		setPartyMembers((prevMemebers: SelectPayMember[]) => {
			const updatedInvolveState = [...prevMemebers];
			const index = updatedInvolveState.findIndex((item) => item.member_uuid === memberUuid);
			if (index !== -1) {
				updatedInvolveState[index] = {
					member_uuid: memberUuid,
					amount: amount,
					checked: checked,
					member_nickname: memberNickname,
					image: image,
				};
			} else {
				updatedInvolveState.push({
					member_uuid: memberUuid,
					amount: amount,
					checked: checked,
					member_nickname: memberNickname,
					image: image,
				});
			}
			return updatedInvolveState;
		});
	};
	const handleAmountChange = (
		memberUuid: string,
		amount: string,
		checked: boolean,
		memberNickname: string,
		image: string,
	) => {
		setPartyMembers((prevMemebers) => {
			const updatedAmounts = [...prevMemebers];
			const index = updatedAmounts.findIndex((item) => item.member_uuid === memberUuid);
			if (index !== -1) {
				updatedAmounts[index] = {
					member_uuid: memberUuid,
					amount: parseFloat(amount),
					checked: checked,
					member_nickname: memberNickname,
					image: image,
				};
			} else {
				updatedAmounts.push({
					member_uuid: memberUuid,
					amount: parseFloat(amount),
					checked: checked,
					member_nickname: memberNickname,
					image: image,
				});
			}
			return updatedAmounts;
		});
	};

	function handleSubmit() {}
	return (
		<ScrollView style={styles.container}>
			<View style={styles.amount_container}>
				<Text style={TextStyles({ align: 'left' }).small}>{payData.payment_unit}</Text>
				<TextInput
					value={totAmount}
					onChangeText={(memo) => {
						setTotAmount(memo);
					}}
					returnKeyType="next"
					keyboardType="numeric"
					style={styles.amountInput}
					selectionColor="#F6F6F6"
					placeholder={payData.amount + ''}
				/>
			</View>
			{isPayer ? (
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
			) : null}

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

			{isPayer ? (
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
							<MIcon
								name="shopping"
								size={40}
								color={selectedcategory === 6 ? '#91C0EB' : 'gray'}
							/>
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
			) : (
				<View style={{ padding: 30 }}></View>
			)}

			<View style={[styles.party_box]}>
				{payData.visible ? (
					<View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text style={TextStyles({ align: 'left' }).medium}>함께 한 사람</Text>
							<View style={{ flexDirection: 'row' }}>
								<Text style={TextStyles({ mLeft: 10 }).medium}>결제</Text>
								<Text style={TextStyles({ mLeft: 10 }).medium}>함께</Text>
							</View>
						</View>
						<ScrollView>
							{partyMembers.map((item) => (
								<PartyListItem
									amount={item.amount}
									key={item.member_uuid}
									name={item.member_nickname}
									img={{ uri: item.image }}
									self={selfCheck}
									involveCheck={item.checked}
									onAmountChange={(input) =>
										handleAmountChange(
											item.member_uuid,
											input,
											item.checked,
											item.member_nickname,
											item.image,
										)
									}
									onInvolveChange={(input) =>
										handleInVolveChange(
											item.member_uuid,
											item.amount,
											input,
											item.member_nickname,
											item.image,
										)
									}
								/>
							))}
						</ScrollView>
					</View>
				) : null}
			</View>

			{isPayer ? (
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
			) : (
				<View style={{ padding: 30 }}></View>
			)}
			<Button
				mode="contained" // 버튼 스타일: 'contained' (채워진 스타일) 또는 'outlined' (테두리 스타일)
				dark={true} // 어두운 테마 사용 여부
				compact={true} // 작은 크기의 버튼 여부
				uppercase={false} // 레이블 텍스트 대문자 변환 여부
				onPress={() => handleSubmit()} // 클릭 이벤트 핸들러
				style={{ marginTop: 10, marginBottom: 70 }}
			>
				수정
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
		// marginTop: 20,
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
export default PaymentModifyScreen;
