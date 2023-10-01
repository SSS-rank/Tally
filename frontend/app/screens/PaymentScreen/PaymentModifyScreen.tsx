import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Text, TextInput, Button, Chip } from 'react-native-paper';

import IIcon from 'react-native-vector-icons/Ionicons';
import { useRecoilState } from 'recoil';

import DateChip from '../../components/DateChip/DateChip';
import PartyListItem from '../../components/PartyList/PartyListItem';
import AmountBox from '../../components/Payment/AmountBox';
import CategoryBox from '../../components/Payment/CategoryBox';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import {
	SelectPayMember,
	ModMember,
	PaymentDetailRes,
	PaymentModifyReq,
	DirectPayMember,
} from '../../model/payment';
import { TripMember } from '../../model/trip';
import { ModifyPaymentScreenProps } from '../../model/tripNavigator';
import { MemberState } from '../../recoil/memberRecoil';
import { CurTripInfoState } from '../../recoil/recoil';
import formatDate from '../../services/FormDate';
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
	const [payerUuid, setPayerUuid] = useState('');
	const [partyMembers, setPartyMembers] = useState<SelectPayMember[]>([]); // 결제 멤버

	useEffect(() => {
		const { payment_uuid, payer, method } = route.params;
		setPaymentUuid(payment_uuid);
		setPayerUuid(payer);
		if (memberinfo.member_uuid == payer) {
			//본인이 결제자 인 경우
			setIspayer(true);
		}

		if (method === 'CASH') {
			// 현금 타입인 경우
			setIsCash(true);
		}

		async function fetchData() {
			let role = 'tag';
			if (memberinfo.member_uuid == payer) {
				role = 'payer';
			}
			const res = await api.get(`payment/${role}/${payment_uuid}`);
			if (res && res.status == 200) {
				const responseData = res.data;
				setTotAmount(responseData.amount + '');
				setStore(responseData.payment_name);
				setText(responseData.memo);
				setPaymentUnit(responseData.payment_unit);
				// 참가자 리스트 생성
				const partyData = curTripInfo.participants.map((item: TripMember) => {
					return {
						amount: 0,
						member_uuid: item.member_uuid,
						checked: false,
						member_nickname: item.member_nickname,
						image: item.image,
					};
				});
				// 기존 저장된 참가자 데이터 가져오기
				const memberdata = responseData.payment_participants.map((item: ModMember) => {
					return {
						amount: item.amount,
						member_uuid: item.member_uuid,
						checked: item.with,
						member_nickname: item.nickname,
						image: item.profile_image,
					};
				});
				// 참여자 데이터에 기존 참여자 데이터 업데이트
				const updatedPartyData = partyData.map((partyItem) => {
					const matchingMember = memberdata.find(
						(memberItem: ModMember) => memberItem.member_uuid === partyItem.member_uuid,
					);
					if (matchingMember) {
						return {
							...partyItem,
							amount: matchingMember.amount,
							checked: matchingMember.checked,
							member_nickname: matchingMember.member_nickname,
							image: matchingMember.image,
						};
					}
					return partyItem; // 만약 일치하는 멤버가 없다면 기존의 partyData를 그대로 반환합니다.
				});

				setPartyMembers(updatedPartyData);

				//결제자인 경우
				if (role == 'payer') {
					setSelectedCategory(responseData.category);
					setVisible(responseData.visible);
				}
			}
		}
		fetchData();
	}, []);

	const handleInVolveChange = (
		// 결제자 참여 버튼 클릭시 처리 함수
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
		//참가자 결제 금액 수정시 처리함수
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

	async function handleSubmit() {
		let member = partyMembers.map((item) => {
			if (item.amount > 0) {
				return { amount: item.amount, member_uuid: item.member_uuid };
			}
		});
		console.log(member);
		// 나만 보기 설정한 경우
		if (!visible) {
			member = [{ amount: Number(totAmount), member_uuid: memberinfo.member_uuid }];
		}
		if (isPayer) {
			const payment_type = isCash ? 'manual' : 'auto';
			console.log(payment_type);
			let req: PaymentModifyReq;
			if (isCash) {
				//수동입력된 케이스
				req = {
					amount: totAmount,
					category: selectedcategory,
					memo: text,
					payment_date_time: formatDate(date),
					payment_participants: member as DirectPayMember[],
					payment_uuid: paymentUuid,
					travel_id: curTripInfo.id,
					title: store,
					visible: visible,
					ratio: 1,
					payment_unit_id: 8,
				};
			} else {
				//자동 입력된 케이스
				req = {
					category: selectedcategory,
					memo: text,
					payment_participants: member as DirectPayMember[],
					payment_uuid: paymentUuid,
					travel_id: curTripInfo.id,
					visible: visible,
				};
			}
			const res = await api.patch(`payment/${payment_type}`, req);
			if (res.status == 200) {
				navigation.navigate('TripDetail', { travel_id: curTripInfo.id });
			}
		} else {
			console.log('태그자 수정 요청 ');
		}
	}
	return (
		<ScrollView style={styles.container}>
			<AmountBox
				isCash={isCash}
				isPayer={isPayer}
				totAmount={totAmount}
				paymentUnit={paymentUnit}
				setTotAmount={setTotAmount}
			/>

			{isPayer ? (
				<View>
					<DateChip date={date} setDate={setDate} open={open} setOpen={setOpen} />
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
				<CategoryBox
					selectedcategory={selectedcategory}
					setSelectedCategory={setSelectedCategory}
				/>
			) : (
				<View style={{ padding: 30 }}></View>
			)}

			<View style={[styles.party_box]}>
				{visible ? (
					<View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Text style={TextStyles({ align: 'left' }).medium}>함께 한 사람</Text>
							<View style={{ flexDirection: 'row' }}>
								<Text style={TextStyles({ mRight: 20 }).medium}>금액</Text>
								<Text style={TextStyles({ mLeft: 20 }).medium}>참여</Text>
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
									block={!isPayer} //결제자가 아닌 경우 안보이도록 변수 설정
									isPayer={item.member_uuid == payerUuid}
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
				<View>
					<View style={styles.self_check_box}>
						<View>
							<Text style={TextStyles({ align: 'left' }).medium}>이 비용 나만보기</Text>
							<Text style={TextStyles({ align: 'left' }).small}>
								일행에게 보이지 않는 비용이며, 정산에서 제외됩니다.
							</Text>
						</View>
						<IIcon
							name={!visible ? 'checkmark-circle' : 'checkmark-circle-outline'}
							size={32}
							color="#91C0EB"
							style={{ marginLeft: 5 }}
							onPress={() => {
								setVisible(!visible);
							}}
						/>
					</View>
					<Button
						mode="contained" // 버튼 스타일: 'contained' (채워진 스타일) 또는 'outlined' (테두리 스타일)
						dark={true} // 어두운 테마 사용 여부
						compact={true} // 작은 크기의 버튼 여부
						onPress={() => handleSubmit()} // 클릭 이벤트 핸들러
						style={{ marginTop: 10, marginBottom: 70 }}
					>
						수정
					</Button>
				</View>
			) : (
				<View>
					<Button
						mode="contained" // 버튼 스타일: 'contained' (채워진 스타일) 또는 'outlined' (테두리 스타일)
						dark={true} // 어두운 테마 사용 여부
						compact={true} // 작은 크기의 버튼 여부
						onPress={() => handleSubmit()} // 클릭 이벤트 핸들러
						style={{ marginTop: 10 }}
					>
						메모 수정
					</Button>
					<Button
						mode="contained" // 버튼 스타일: 'contained' (채워진 스타일) 또는 'outlined' (테두리 스타일)
						dark={true} // 어두운 테마 사용 여부
						compact={true} // 작은 크기의 버튼 여부
						onPress={() => handleSubmit()} // 클릭 이벤트 핸들러
						style={{ marginTop: 10, marginBottom: 70 }}
					>
						수정 요청
					</Button>
				</View>
			)}
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	memo_box: {
		flex: 3,
		justifyContent: 'flex-start',
		marginTop: 20,
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
		backgroundColor: 'white',
		flex: 1,
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
});
export default PaymentModifyScreen;
