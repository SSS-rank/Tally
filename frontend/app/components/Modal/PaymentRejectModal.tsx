import React, { useState } from 'react';
import { Text, Modal, Pressable, StyleSheet, View, Alert, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { TextStyles } from '../../styles/CommonStyles';
interface PaymentRejectModalProps {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	paymentUuid: string;
}
function PaymentRejectModal({
	modalVisible,
	setModalVisible,
	paymentUuid,
}: PaymentRejectModalProps) {
	const [message, setMessage] = useState('');
	const api = useAxiosWithAuth();
	function reset() {
		setMessage('');
	}
	async function sendRejectAlarm() {
		const res = await api.post(`notification/payer/${paymentUuid}`);
		if (res.status) {
			console.log(res.data);
		}
	}
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.');
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
							정산 수정 요청 사유
						</Text>
						<Text style={{ ...TextStyles({ align: 'left' }).small, flex: 1 }}>
							정산 수정 요청에 대한 이유를 작성해주세요.
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
					<TextInput
						style={{
							...TextStyles({ align: 'left' }).regular,
							flex: 1,
						}}
						value={message}
						onChangeText={setMessage}
						placeholder="금액 조정이 필요합니다."
					/>
					<Icon
						name="close-circle"
						style={{
							color: '#666666',
							fontSize: 24,
						}}
						onPress={reset}
					/>
				</View>
				<Button
					mode="contained"
					buttonColor="#91C0EB"
					textColor="white"
					style={{ marginVertical: 15 }}
					onPress={() => sendRejectAlarm()}
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
export default PaymentRejectModal;
