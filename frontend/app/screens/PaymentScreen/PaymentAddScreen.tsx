import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Text, TextInput, Button, Chip } from 'react-native-paper';

import FIcon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilState } from 'recoil';

import ExRateDropDown from '../../components/DropDown/ExRateDropDown';
import PartyListItem from '../../components/PartyList/PartyListItem';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { DirectPayMember, DirectPayReq, SelectPayMember } from '../../model/payment';
import { TripMember } from '../../model/trip';
import { AddPaymentScreenProps } from '../../model/tripNavigator';
import { MemberState } from '../../recoil/memberRecoil';
import { TextStyles } from '../../styles/CommonStyles';

function PaymentAddScreen({ navigation, route }: AddPaymentScreenProps) {
	const api = useAxiosWithAuth();
	const [dropDownOpen, setDropDownOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [memberinfo, setMemberInfo] = useRecoilState(MemberState);
	const [exData, setExData] = useState('');
	const [totAmount, setTotAmount] = useState(''); // 원화 환산 결제 총액
	const [money, setMoney] = useState(''); // 결제 금액 (현지 결제 단위)
	const [text, setText] = useState('');
	const [store, setStore] = useState('');
	const [selectedcategory, setSelectedCategory] = useState(0);
	const [visible, setVisible] = useState(true);
	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);

	const [partyMembers, setPartyMembers] = useState<SelectPayMember[]>([]); // 결제 멤버
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
		visible: true,
	});
	useEffect(() => {
		// route.params에 접근하는 부분
		setTotAmount('');
		setText('');
		setStore('');
		setSelectedCategory(0);
		setVisible(true);
		setDate(new Date());
		setOpen(false);
		const { travel_id, travel_title, participants } = route.params || {
			travel_id: undefined,
			travel_title: undefined,
			participants: undefined,
		};
		if (participants) {
			const directPayMembers = participants.map((member: TripMember) => ({
				amount: 0, // 초기값 설정 (원하는 초기값으로 변경)
				member_uuid: member.member_uuid,
				checked: false,
				member_nickname: member.member_nickname,
				image: member.image,
			}));
			setPartyMembers(directPayMembers);
			setDirectPayReq((prevState: DirectPayReq) => ({
				...prevState,
				title: store || '',
				travel_id: travel_id || 0,
			}));
		}

		// route.params에 의존하는 추가적인 코드 작성
	}, [route.params]);

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
	const removeCommaAndParseInt = (inputString: string): number => {
		const numberWithoutComma = parseFloat(inputString.replace(/,/g, ''));

		if (!isNaN(numberWithoutComma)) {
			return numberWithoutComma;
		} else {
			return 0;
		}
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
		try {
			const partyData = partyMembers
				.filter((item) => item.checked) // checked가 true인 아이템들만 필터링합니다.
				.map((item) => ({
					amount: item.amount,
					member_uuid: item.member_uuid,
				}));

			setDirectPayReq((prevState: DirectPayReq) => ({
				...prevState,
				payment_date_time: formatDate(date),
				payment_type: 'cash',
				payment_unit_id: 8,
				ratio: 1,
				amount: parseFloat(totAmount),
				category: selectedcategory,
				memo: text,
				title: store || '',
				payment_participants: partyData || [],
				visible: visible,
			}));
			if (!visible) {
				const selfData: DirectPayMember[] = [
					{ amount: Number(totAmount), member_uuid: memberinfo.member_uuid },
				];

				setDirectPayReq((prevState: DirectPayReq) => ({
					...prevState,
					payment_participants: selfData || [],
					visible: visible,
				}));
			}

			const res = await api.post(`/payment/manual`, directPayReq);

			if (res.status === 201) {
				navigation.goBack();
			}
			console.log(partyMembers);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<View style={styles.container}>
			<View style={styles.amount_container}>
				<ExRateDropDown
					setValue={setExData}
					setOpen={setDropDownOpen}
					open={dropDownOpen}
					value={exData}
				/>
				<View
					style={{
						flexDirection: 'row',
						marginTop: 30,
						alignContent: 'center',
						justifyContent: 'center',
					}}
				>
					<Text style={TextStyles({ align: 'left' }).medium}>
						1 {exData.split(':')[1]} : {exData.split(':')[0]} 원
					</Text>
				</View>
				<View
					style={{
						alignContent: 'center',
						justifyContent: 'space-between',
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginBottom: 10,
							justifyContent: 'center',
						}}
					>
						<TextInput
							value={money}
							onChangeText={(memo) => {
								setMoney(memo);
								setTotAmount(
									(removeCommaAndParseInt(exData.split(':')[0]) * Number(memo)).toString(),
								);
							}}
							returnKeyType="next"
							keyboardType="numeric"
							style={styles.amountInput}
							selectionColor="#F6F6F6"
						/>
						<Text style={TextStyles({ align: 'left' }).medium}>{exData.split(':')[1]}</Text>
					</View>
					<Text style={TextStyles({ align: 'right' }).title}> 총 금액 {totAmount} 원</Text>
				</View>
			</View>
			<ScrollView>
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
						style={styles.date_picker}
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

				<View style={[styles.party_box]}>
					{visible ? (
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
										block={false}
										isPayer={item.member_uuid == memberinfo.member_uuid}
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
					uppercase={false} // 레이블 텍스트 대문자 변환 여부
					onPress={() => handleSubmit()} // 클릭 이벤트 핸들러
					style={{ marginTop: 10 }}
				>
					등록
				</Button>
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
		padding: 30,
		// marginTop: 20,
		backgroundColor: '#F6F6F6',
	},

	date_box: {
		justifyContent: 'flex-start',
		marginTop: 20,
		zIndex: 9000,
		zIndexInverse: 2000,
	},
	category_box: {
		marginTop: 20,
		flexDirection: 'column',
	},
	party_box: {
		flex: 6,
	},
	check_box_container: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	self_check_box: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	submit: {},
	date_picker: { zIndex: 9000, zIndexInverse: 2000 },
});
export default PaymentAddScreen;
