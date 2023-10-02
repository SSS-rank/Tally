import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRecoilValue } from 'recoil';

import TransferPasswordInput from '../../components/TransferPasswordInput/TransferPasswordInput';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { AccountResgistReq } from '../../model/account';
import { HomeStackProps } from '../../navigation/HomeStack';
import { accountResgistReqState, transferPasswordState } from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';

type TransferPasswrodConfirmScreenProps = NativeStackScreenProps<
	HomeStackProps,
	'TransferPasswordConfirm'
>;

function TransferPasswrodConfirmScreen({ navigation }: TransferPasswrodConfirmScreenProps) {
	const transferPassword = useRecoilValue(transferPasswordState);
	const accountRegistInfo = useRecoilValue(accountResgistReqState);
	const api = useAxiosWithAuth();

	const [modalVisible, setModalVisible] = useState(false);
	const hideModal = () => {
		setModalVisible(false);
	};

	// TransferPasswordInput에서 입력한 비밀번호 전달
	const onSubmit = async (password: string) => {
		console.log('onSubmit confirm');

		if (transferPassword === password) {
			console.log('비밀번호 확인');

			try {
				// 첫 번째 계좌 추가
				const accountReq: AccountResgistReq = {
					...accountRegistInfo,
					transfer_password: password,
				};
				const res = await api.post(`/account`, accountReq);

				if (res.status === 200) {
					// 계좌 추가 성공 시 계좌 목록 페이지로 이동
					navigation.navigate('Account');
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			console.log('비밀번호 틀림');
			setModalVisible(true);
		}
	};
	return (
		<>
			<TransferPasswordInput text="비밀번호를 다시 입력해주세요" onSubmit={onSubmit} />
			<Portal>
				<Modal
					visible={modalVisible}
					onDismiss={hideModal}
					contentContainerStyle={styles.modalContainer}
				>
					<View style={styles.modalView}>
						<Icon name="alert-circle-outline" size={160} style={styles.icon} />
						<Text style={styles.title}>{`비밀번호가 일치하지 않습니다\n 다시 입력해주세요`}</Text>
					</View>
				</Modal>
			</Portal>
		</>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		width: '100%',
		paddingHorizontal: 20,
	},
	modalView: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		...TextStyles({ mBottom: 30 }).title,
	},
	icon: {
		color: '#91C0EB',
	},
});

export default TransferPasswrodConfirmScreen;
