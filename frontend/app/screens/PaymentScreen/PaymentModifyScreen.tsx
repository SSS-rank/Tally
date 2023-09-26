import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Text, TextInput, Button, Chip } from 'react-native-paper';

import FIcon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilState } from 'recoil';

import PartyListItem from '../../components/PartyList/PartyListItem';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { SelectPayMember, ModMember, PaymentDetailRes } from '../../model/payment';
import { ModifyPaymentScreenProps } from '../../model/tripNavigator';
import { MemberState } from '../../recoil/memberRecoil';
import { CurTripInfoState } from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';

function PaymentModifyScreen({ navigation, route }: ModifyPaymentScreenProps) {
	const api = useAxiosWithAuth();
	const [memberinfo, setMemberInfo] = useRecoilState(MemberState);
	const [curTripInfo, setCurTripInfo] = useRecoilState(CurTripInfoState);
	const [store, setStore] = useState('');
	const [totAmount, setTotAmount] = useState('');
	const [text, setText] = useState('');
	const [selectedcategory, setSelectedCategory] = useState(0);
	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);
	const [paymentUnit, setPaymentUnit] = useState('');
	const [isPayer, setIspayer] = useState(false);
	const [isCash, setIsCash] = useState(false);
	const [visible, setVisible] = useState(true);
	const [paymentUuid, setPaymentUuid] = useState('');
	const [partyMembers, setPartyMembers] = useState<SelectPayMember[]>([]); // 결제 멤버

	useEffect(() => {
		const { payment_uuid, payer, method } = route.params;
		setPaymentUuid(payment_uuid);
		if (memberinfo.member_uuid == payer) {
			setIspayer(true);
		}
		if (method === 'CASH') {
			setIsCash(true);
		}

		async function fetchData() {
			if (isPayer) {
				console.log('결제자');
				const res = await api.get(`payment/payer/${payment_uuid}`);
				if (res && res.status === 200) {
					const responseData = res.data;
					console.log(res.data);
					// 비동기 처리를 위해 responseData 사용
					setTotAmount(responseData.amount + '');
					setStore(responseData.payment_name);
					setText(responseData.memo);
					setSelectedCategory(responseData.category);
					setPaymentUnit(responseData.payment_unit);
					setVisible(responseData.visible);
					// setDate(responseData.payment_date);
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
			} else {
				// 태그된 사람
				const res = await api.get(`payment/tag/${payment_uuid}`);
				const responseData = res.data;
				// 비동기 처리를 위해 responseData 사용
				if (res && res.status == 200) {
					setTotAmount(responseData.amount + '');
					setStore(responseData.payment_name);
					setText(responseData.memo);
					setSelectedCategory(responseData.category);
					setPaymentUnit(responseData.payment_unit);
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
			}
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

	function formatDate(in_date: Date) {
		const year = in_date.getFullYear();
		const month = String(in_date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
		const day = String(in_date.getDate()).padStart(2, '0'); // 일자를 2자리로 포맷팅
		const hours = String(in_date.getHours()).padStart(2, '0'); // 시간을 2자리로 포맷팅
		const minutes = String(in_date.getMinutes()).padStart(2, '0'); // 분을 2자리로 포맷팅

		return `${year}-${month}-${day} ${hours}:${minutes}`;
	}
	async function handleSubmit() {
		let member = partyMembers.map((item) => {
			return { amount: item.amount, member_uuid: item.member_uuid };
		});
		if (!visible) {
			member = [{ amount: Number(totAmount), member_uuid: memberinfo.member_uuid }];
		}
		if (isPayer) {
			if (isCash) {
				//수동입력된 케이스
				const req = {
					amount: totAmount,
					category: selectedcategory,
					memo: text,
					payment_date_time: formatDate(date),
					payment_participants: member,
					payment_uuid: paymentUuid,
					travel_id: curTripInfo.id,
					title: store,
					visible: visible,
					ratio: 1,
					payment_unit_id: 8,
				};
				const res = await api.patch('payment/manual', req);
				if (res.status == 200) {
					navigation.navigate('TripDetail', { travel_id: curTripInfo.id });
				}
			} else {
				//자동 입력된 케이스
				const req = {
					category: selectedcategory,
					memo: text,
					payment_participants: member,
					payment_uuid: paymentUuid,
					travel_id: curTripInfo.id,
					visible: visible,
				};
				const res = await api.patch('payment/auto', req);
				if (res.status == 200) {
					navigation.navigate('TripDetail', { travel_id: curTripInfo.id });
				}
			}
		} else {
			console.log('태그자 수정 요청 ');
		}
	}
	return (
		<ScrollView style={styles.container}>
			<View style={styles.amount_container}>
				<Text>{store}</Text>
				<Text style={TextStyles({ align: 'left' }).small}>{paymentUnit}</Text>
				{isCash ? (
					<TextInput
						value={totAmount}
						onChangeText={(memo) => {
							setTotAmount(memo);
						}}
						returnKeyType="next"
						keyboardType="numeric"
						style={styles.amountInput}
						selectionColor="#F6F6F6"
						placeholder={totAmount}
					/>
				) : (
					<Text style={TextStyles({ align: 'left' }).medium}>{totAmount}</Text>
				)}
			</View>

			{isPayer ? (
				<View>
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
					{isCash ? (
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
					) : null}
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
				{!visible ? (
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
						name={visible ? 'checkmark-circle' : 'checkmark-circle-outline'}
						size={32}
						color="#91C0EB"
						style={{ marginLeft: 5 }}
						onPress={() => {
							setVisible(!visible);
						}}
					/>
				</View>
			) : (
				<View style={{ padding: 30 }}></View>
			)}
			{isPayer ? (
				<Button
					mode="contained" // 버튼 스타일: 'contained' (채워진 스타일) 또는 'outlined' (테두리 스타일)
					dark={true} // 어두운 테마 사용 여부
					compact={true} // 작은 크기의 버튼 여부
					onPress={() => handleSubmit()} // 클릭 이벤트 핸들러
					style={{ marginTop: 10, marginBottom: 70 }}
				>
					수정
				</Button>
			) : (
				<Button
					mode="contained" // 버튼 스타일: 'contained' (채워진 스타일) 또는 'outlined' (테두리 스타일)
					dark={true} // 어두운 테마 사용 여부
					compact={true} // 작은 크기의 버튼 여부
					onPress={() => handleSubmit()} // 클릭 이벤트 핸들러
					style={{ marginTop: 10, marginBottom: 70 }}
				>
					수정 요청
				</Button>
			)}
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
