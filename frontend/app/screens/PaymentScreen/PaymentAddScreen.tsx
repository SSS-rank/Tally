import React, { useState, useEffect, useCallback } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	ScrollView,
	Alert,
	Text,
	Pressable,
	Modal,
	FlatList,
} from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { Image } from 'react-native-svg';

import { useFocusEffect } from '@react-navigation/native';
import IIcon from 'react-native-vector-icons/Ionicons';
import { useRecoilState, useRecoilValue } from 'recoil';

import exRateApi from '../../api/exRateApi';
import DateChip from '../../components/DateChip/DateChip';
import ExRateDropDown from '../../components/DropDown/ExRateDropDown';
import OcrModal from '../../components/Modal/OcrModal';
import CameraButton from '../../components/OCR/CameraButton';
import PartyListItem from '../../components/PartyList/PartyListItem';
import CategoryBox from '../../components/Payment/CategoryBox';
import PaymentUnitItem from '../../components/Payment/PaymentUnitItem';
import SortItem from '../../components/TripScreen/SortItem';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import {
	DirectPayMember,
	DirectPayReq,
	GlobalFinance,
	OcrData,
	SelectPayMember,
} from '../../model/payment';
import { TripMember } from '../../model/trip';
import { AddPaymentScreenProps } from '../../model/tripNavigator';
import { MemberState } from '../../recoil/memberRecoil';
import { OcrState } from '../../recoil/ocrRecoil';
import { CurTripInfoState } from '../../recoil/recoil';
import formatDate from '../../services/FormDate';
import removeCommaAndParseInt from '../../services/removeCommaAndParseInt';
import { TextStyles } from '../../styles/CommonStyles';

function PaymentAddScreen({ navigation, route }: AddPaymentScreenProps) {
	const api = useAxiosWithAuth();
	const [ocrRecoil, setOcrRecoil] = useRecoilState(OcrState);
	const [dropDownOpen, setDropDownOpen] = useState(false);
	const [memberinfo, setMemberInfo] = useRecoilState(MemberState);
	const [exData, setExData] = useState('1:한국 원(KRW)');
	const [totAmount, setTotAmount] = useState(0); // 원화 환산 결제 총액
	const [money, setMoney] = useState(''); // 결제 금액 (현지 결제 단위)
	const [text, setText] = useState('');
	const [store, setStore] = useState('');
	const [selectedcategory, setSelectedCategory] = useState(0);
	const [visible, setVisible] = useState(true);
	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const curTripInfo = useRecoilValue(CurTripInfoState);
	const [partyMembers, setPartyMembers] = useState<SelectPayMember[]>([]); // 결제 멤버
	const [paymentUnitModalVisible, setPaymentUnitModalVisible] = useState(false); // 통화 선택 모달
	const [paymentUnits, setPaymentUnits] = useState<GlobalFinance[]>([]); // 통화 api 호출 response
	const [curUnit, setCurUnit] = useState('KRW'); // 현재 선택된 통화 코드

	useEffect(() => {
		console.log('useEffect');
		setTotAmount(0);
		setText('');
		setStore('');
		setSelectedCategory(0);
		setVisible(true);
		setDate(new Date());
		setOpen(false);
		const { participants } = route.params || {
			participants: undefined,
		};
		console.log(participants);
		if (participants) {
			const directPayMembers = participants.map((member: TripMember) => ({
				amount: 0,
				member_uuid: member.member_uuid,
				checked: false,
				member_nickname: member.member_nickname,
				image: member.image,
			}));
			setPartyMembers(directPayMembers);
		}
	}, [route.params]);

	function handleOcrData(ocr_data: OcrData) {
		if (ocr_data.title != 'error') {
			console.log(ocr_data);
			setOcrRecoil(ocr_data);
			console.log(ocrRecoil);
			setModalVisible(true);
			console.log('handleOcrdata' + ocrRecoil.title);
		} else {
			Alert.alert('데이터가 없습니다');
		}
	}
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

	async function handleSubmit() {
		try {
			const partyData = partyMembers
				.filter((item) => item.checked) // checked가 true인 아이템들만 필터링합니다.
				.map((item) => ({
					amount: item.amount,
					member_uuid: item.member_uuid,
				}));
			let payment_add_req: DirectPayReq;
			if (visible) {
				payment_add_req = {
					travel_id: curTripInfo.id,
					payment_date_time: formatDate(date),
					payment_type: 'cash',
					payment_unit_id: 8,
					ratio: 1,
					amount: totAmount,
					category: selectedcategory,
					memo: text,
					title: store,
					payment_participants: partyData,
					visible: visible,
				};
			} else {
				const selfData: DirectPayMember[] = [
					{ amount: Number(totAmount), member_uuid: memberinfo.member_uuid },
				];
				payment_add_req = {
					travel_id: curTripInfo.id,
					payment_date_time: formatDate(date),
					payment_type: 'cash',
					payment_unit_id: 8,
					ratio: 1,
					amount: totAmount,
					category: selectedcategory,
					memo: text,
					title: store,
					payment_participants: selfData,
					visible: visible,
				};
			}

			const res = await api.post(`/payment/manual`, payment_add_req);

			if (res.status === 201) {
				navigation.goBack();
			}
			console.log(partyMembers);
		} catch (err) {
			console.log(err);
		}
	}

	const getExRate = async () => {
		try {
			// const params = { searchdate: getCurrentDate() };
			// 공휴일은 제공을 안하는 것으로 확인되어 임시로 20230927로 하드코딩
			const params = { searchdate: 20230927 };

			const res = await exRateApi.get('', { params });
			if (res.status === 200) {
				const responseData = res.data.map((item: any) => ({
					cur_unit: item.cur_unit,
					deal_bas_r: item.deal_bas_r,
					cur_nm: item.cur_nm,
				}));

				console.log('responseData ', responseData);
				setPaymentUnits(responseData);
			}
		} catch (err: any) {
			Alert.alert(err);
		}
	};

	// 화면이 포커스 될 때마다 통화 선택 모달 데이터 불러오기
	useFocusEffect(
		useCallback(() => {
			getExRate();
		}, []),
	);

	// 통화선택에서 선택한 통화가 바뀔 때마다 금액 입력에 1원 들어가기
	useEffect(() => {
		if (curUnit !== '') {
			setMoney('1');
			setTotAmount(removeCommaAndParseInt(exData.split(':')[0]) * 1);
		}
	}, [curUnit]);

	return (
		<>
			{/* <ExRateDropDown
				setValue={setExData}
				setOpen={setDropDownOpen}
				open={dropDownOpen}
				value={exData}
			/> */}
			<ScrollView style={styles.container}>
				<OcrModal
					setDate={setDate}
					setStore={setStore}
					setTotAmount={setTotAmount}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					setMoney={setMoney}
					setExData={setExData}
				/>

				<View style={styles.priceContainer}>
					<View style={styles.priceTopBox}>
						<CameraButton handleOcrData={handleOcrData} />
					</View>
					<View style={styles.amountInputContainer}>
						<Button
							icon="chevron-down"
							style={{ justifyContent: 'flex-start' }}
							mode="text"
							// buttonColor="#91C0EB"
							textColor="#232323"
							labelStyle={TextStyles().regular}
							contentStyle={{ flexDirection: 'row-reverse' }}
							onPress={() => setPaymentUnitModalVisible(true)}
						>
							{exData.split(':')[0] ? exData.split(':')[1].split(' ')[0] : '통화 선택'}
						</Button>
						{/* <Text style={{ ...TextStyles().regular, verticalAlign: 'middle', flex: 1 }}>
							통화 선택 {'>'}
						</Text> */}
						<View style={styles.inputBox}>
							<TextInput
								style={styles.priceTextInput}
								value={money}
								onChangeText={(memo) => {
									setMoney(memo);
									setTotAmount(removeCommaAndParseInt(exData.split(':')[0]) * Number(memo));
								}}
								returnKeyType="next"
								keyboardType="numeric"
								selectionColor="#91C0EB"
								placeholder="0"
							/>
						</View>
						<Text style={{ ...TextStyles().regular, verticalAlign: 'middle' }}>{curUnit}</Text>
					</View>
					<View style={styles.priceBottomBox}>
						<Text
							style={{
								...TextStyles({ align: 'right', weight: 'bold' }).regular,
								textAlignVertical: 'center',
								paddingRight: 5,
								flex: 1,
							}}
						>
							{totAmount.toLocaleString()}
						</Text>
						<Text style={{ ...TextStyles({ align: 'left' }).regular, textAlignVertical: 'center' }}>
							원
						</Text>
					</View>
				</View>
				<DateChip date={date} setDate={setDate} open={open} setOpen={setOpen} block={false} />
				<View style={[styles.contentBox]}>
					<Text style={styles.contentTitle}>결제처</Text>
					<TextInput
						value={store}
						onChangeText={(memo) => {
							setStore(memo);
						}}
						returnKeyType="next"
						style={styles.textInput}
					/>
				</View>
				<View style={[styles.contentBox]}>
					<Text style={styles.contentTitle}>메모</Text>
					<TextInput
						value={text}
						onChangeText={(memo) => {
							setText(memo);
						}}
						returnKeyType="next"
						style={styles.textInput}
					/>
				</View>
				<CategoryBox
					selectedcategory={selectedcategory}
					setSelectedCategory={setSelectedCategory}
					blocked={false}
				/>
				<View style={[styles.party_box, styles.contentBox]}>
					{visible ? (
						<View>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<Text style={styles.contentTitle}>함께 한 사람</Text>
								<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
									<Text style={styles.party_type}>금액</Text>
									<Text style={styles.party_type}>함께</Text>
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
				<View style={[styles.self_check_box, styles.contentBox]}>
					<View>
						<Text style={styles.contentTitle}>이 비용 나만보기</Text>
						<Text style={TextStyles({ align: 'left' }).small}>
							일행에게 보이지 않는 비용이며, 정산에서 제외됩니다.
						</Text>
					</View>
					<IIcon
						name={!visible ? 'checkmark-circle' : 'checkmark-circle-outline'}
						size={32}
						color={visible ? '#D0D0D0' : '#91C0EB'}
						style={{ marginLeft: 5 }}
						onPress={() => {
							setVisible(!visible);
						}}
					/>
				</View>
				<Button
					mode="contained"
					buttonColor="#91C0EB"
					textColor="white"
					dark={true} // 어두운 테마 사용 여부
					compact={true} // 작은 크기의 버튼 여부
					uppercase={false} // 레이블 텍스트 대문자 변환 여부
					onPress={() => handleSubmit()} // 클릭 이벤트 핸들러
					style={{ marginBottom: 50 }}
				>
					등록
				</Button>
			</ScrollView>
			<Modal
				animationType="slide"
				transparent={true}
				visible={paymentUnitModalVisible}
				onRequestClose={() => {
					setPaymentUnitModalVisible(!paymentUnitModalVisible);
				}}
			>
				<Pressable
					style={{ backgroundColor: '#00000070', flex: 1 }}
					onPress={() => setPaymentUnitModalVisible(!paymentUnitModalVisible)}
				/>
				<View style={styles.modalView}>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
						<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).regular, flex: 1 }}>
							통화 선택
						</Text>
						<IIcon
							name="close"
							size={32}
							color={'#666666'}
							onPress={() => setPaymentUnitModalVisible(!paymentUnitModalVisible)}
						/>
					</View>
					<View style={styles.payment_unit_container}>
						<FlatList
							data={paymentUnits}
							renderItem={({ item }) => (
								<PaymentUnitItem
									key={item.cur_unit}
									cur_unit={item.cur_unit}
									cur_nm={item.cur_nm}
									deal_bas_r={item.deal_bas_r}
									curUnit={curUnit}
									setCurUnit={setCurUnit}
									setExData={setExData}
									setPaymentUnitModalVisible={setPaymentUnitModalVisible}
								/>
							)}
							keyExtractor={(item) => item.cur_unit}
						/>
					</View>
				</View>
			</Modal>
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingTop: 10,
		backgroundColor: 'white',
		flex: 1,
	},
	priceContainer: {
		backgroundColor: '#E6E6E6',
		paddingHorizontal: 10,
		paddingVertical: 10,
		textAlignVertical: 'center',
		verticalAlign: 'middle',
		flex: 1,
		// height: 150,
		// flexWrap: 'wrap',
	},
	amountInputContainer: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
	},
	priceBottomBox: {
		flexDirection: 'row',
		flex: 1,
		marginVertical: 5,
	},
	priceTopBox: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignContent: 'center',
	},
	currencyRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		verticalAlign: 'middle',
		flex: 1,
	},
	currencyInfo: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'flex-start',
	},
	priceTextInput: {
		...TextStyles({ align: 'right' }).regular,
	},
	inputBox: {
		borderBottomColor: '#A0A0A0',
		borderBottomWidth: 0.5,
		marginVertical: 5,
		justifyContent: 'center',
		// alignItems: 'center',

		// width: '100%',
		flex: 3,
		verticalAlign: 'middle',
	},
	contentBox: {
		marginTop: 30,
	},
	contentTitle: {
		...TextStyles({ align: 'left', mBottom: 5 }).regular,
	},
	textInput: {
		...TextStyles({ align: 'left' }).regular,
		borderBottomColor: '#A0A0A0',
		borderBottomWidth: 0.5,
		justifyContent: 'center',
		verticalAlign: 'middle',
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

	amount_left: {
		flex: 0.55,
	},

	amount_left_input: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},

	date_box: {
		justifyContent: 'flex-start',
		zIndex: 9000,
		zIndexInverse: 2000,
	},
	category_box: {
		flexDirection: 'column',
	},
	party_box: {
		flex: 6,
	},
	party_type: {
		...TextStyles({ mLeft: 40 }).small,
	},
	check_box_container: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	self_check_box: {
		marginBottom: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	submit: {},
	date_picker: { zIndex: 9000, zIndexInverse: 2000 },
	chip: {
		backgroundColor: 'transparent',
		borderBottomWidth: 1,
		borderBottomColor: '#232323',
		marginVertical: 20,
		paddingLeft: 5,
	},
	modalView: {
		width: '100%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: 'white',
		padding: 35,
		position: 'absolute',
		bottom: 0,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: '50%',
	},
	payment_unit_container: {
		width: '100%',
		marginBottom: 40,
	},
});
export default PaymentAddScreen;
