import React, { useCallback, useEffect, useState } from 'react';
import { Text, Modal, Pressable, StyleSheet, View, Alert, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';
import { useRecoilState } from 'recoil';

import { OcrState } from '../../recoil/ocrRecoil';
import getExRate from '../../services/getExRate';
import { TextStyles } from '../../styles/CommonStyles';
interface OcrModalProps {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setStore: React.Dispatch<React.SetStateAction<string>>;
	setTotAmount: React.Dispatch<React.SetStateAction<string>>;
	setDate: React.Dispatch<React.SetStateAction<Date>>;
	setMoney: React.Dispatch<React.SetStateAction<string>>;
	setExData: React.Dispatch<React.SetStateAction<string>>;
}
function OcrModal({
	modalVisible,
	setModalVisible,
	setStore,
	setTotAmount,
	setMoney,
	setDate,
	setExData,
}: OcrModalProps) {
	const [ocrRecoil, setOcrRecoil] = useRecoilState(OcrState);
	const [ocrAmount, setOcrAmount] = useState(ocrRecoil.amount); // OCR 영수증 금액 (환율 적용 전)
	const [ocrStore, setOcrStore] = useState(ocrRecoil.title);
	const [ocrDate, setOcrDate] = useState(ocrRecoil.date);
	const [ocrCurType, setOcrCurType] = useState(ocrRecoil.cur_type);
	const [ocrTotAmount, setOcrTotAmount] = useState(0);
	const [exRate, setExRate] = useState(1);

	function amountReset() {
		setOcrAmount('');
	}
	function storeReset() {
		setOcrStore('');
	}
	function dateReset() {
		setOcrDate('');
	}

	function handleSubmit() {
		setStore(ocrStore);
		setTotAmount(ocrTotAmount + '');
		console.log(ocrDate);
		// setDate(new Date());
		setMoney(ocrAmount + '');
		setExData(exRate + ':' + ocrCurType);
	}

	useEffect(() => {
		setOcrAmount(ocrRecoil.amount);
		setOcrStore(ocrRecoil.title);
		setOcrDate(ocrRecoil.date);
	}, [ocrRecoil]);
	useEffect(() => {
		if (ocrRecoil.cur_type === 'jp') {
			setOcrCurType('JPY(엔)');
			getExRate('JPY(100)').then((rate) => {
				if (rate) {
					setExRate(rate);
				}
			});
		} else if (ocrRecoil.cur_type === 'us') {
			setOcrCurType('USD(달러)');
			getExRate('USD').then((rate) => {
				if (rate) {
					setExRate(rate);
				}
			});
		} else {
			setOcrCurType('KRW(원)');
			setExRate(1);
		}
	}, [ocrRecoil.cur_type]);

	useEffect(() => {
		setOcrTotAmount(Number(ocrAmount) * exRate);
	}, [ocrAmount, exRate]);
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.');
				amountReset();
				storeReset();
				dateReset();
				setExRate(1);
				setOcrRecoil({ title: '', amount: '', date: '', cur_type: '' });
				setModalVisible(!modalVisible);
			}}
		>
			<Pressable
				style={{ backgroundColor: '#00000070', flex: 1 }}
				onPress={() => setModalVisible(!modalVisible)}
			/>
			<View style={styles.modalView}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={{ flex: 1 }}>
						<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).regular, flex: 1 }}>
							영수증 인식
						</Text>
						<Text style={{ ...TextStyles({ align: 'left' }).small, flex: 1 }}>
							영수증 인식 결과
						</Text>
					</View>
					<Icon
						name="close"
						size={32}
						color={'#666666'}
						onPress={() => setModalVisible(!modalVisible)}
					/>
				</View>
				<View style={styles.inputBox}>
					<Text>결제처</Text>
					<TextInput
						style={{
							...TextStyles({ align: 'left' }).regular,
							flex: 1,
						}}
						value={ocrStore}
						onChangeText={setOcrStore}
						placeholder={'결제처를 입력해주세요'}
					/>
					<Icon
						name="close-circle"
						style={{
							color: '#666666',
							fontSize: 24,
						}}
						onPress={storeReset}
					/>
				</View>
				<View style={styles.inputBox}>
					<Text>금액</Text>
					<TextInput
						style={{
							...TextStyles({ align: 'left' }).regular,
							flex: 1,
						}}
						value={ocrAmount}
						onChangeText={(newAmount) => {
							setOcrAmount(newAmount);
							setOcrTotAmount(Number(newAmount) * exRate); // ocrTotAmount 업데이트
						}}
						placeholder={'금액을 입력해주세요'}
					/>
					<Text>{ocrCurType}</Text>
					<Icon
						name="close-circle"
						style={{
							color: '#666666',
							fontSize: 24,
						}}
						onPress={amountReset}
					/>
				</View>
				<Text style={TextStyles().medium}>총 금액 : {ocrTotAmount.toLocaleString()} 원</Text>

				<Button
					mode="contained"
					buttonColor="#91C0EB"
					textColor="white"
					style={{ marginVertical: 15 }}
					onPress={() => handleSubmit()}
				>
					보내기
				</Button>
			</View>
		</Modal>
	);
}
const styles = StyleSheet.create({
	viewContainer: {
		flexGrow: 1,
		// justifyContent: 'center',
		// alignItems: 'center',

		backgroundColor: 'white',
	},
	modalView: {
		bottom: 0,
		// height: '50%',
		width: '100%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: 'white',
		padding: 35,
		position: 'absolute',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		justifyContent: 'center',
	},
	inputBox: {
		alignItems: 'center',
		borderBottomColor: '#A0A0A0',
		borderBottomWidth: 0.5,
		flexDirection: 'row',
		marginVertical: 5,
		marginTop: 50,
	},
});
export default OcrModal;
