import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Portal, Modal, Button } from 'react-native-paper';

import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { Account } from '../../model/account';
import { TextStyles } from '../../styles/CommonStyles';

interface AccountItemProp extends Account {
	setRepresentativeAccountChange: (value: boolean) => void;
}

function AccountItem({
	accountNumber,
	balance,
	bankCode,
	bankName,
	representativeAccount,
	setRepresentativeAccountChange,
}: AccountItemProp) {
	const api = useAxiosWithAuth();
	const [modalVisible, setModalVisible] = useState(false);
	const changeMainAccount = async () => {
		try {
			const res = await api.patch(`/account/main`, { account_number: accountNumber });
			if (res.status === 200) {
				console.log(res.data);
				if (res.status === 200) {
					setRepresentativeAccountChange(true);
					hideModal();
				}
			}
		} catch (error: any) {
			console.error(error.response);
		}
	};

	const hideModal = () => {
		setModalVisible(false);
	};

	const openModal = () => {
		setModalVisible(true);
	};

	return (
		<TouchableOpacity
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				marginVertical: 15,
				marginHorizontal: 5,
			}}
			onPress={openModal}
		>
			<Avatar.Image
				style={{ backgroundColor: 'transparent', marginHorizontal: 5 }}
				size={36}
				source={{
					uri: `https://sss-tally.s3.ap-northeast-2.amazonaws.com/${bankCode}.png`,
				}}
			/>
			<View style={{ paddingHorizontal: 10, flex: 1 }}>
				<Text
					style={{
						...TextStyles({ align: 'left' }).medium,
						lineHeight: 20,
					}}
				>
					{bankName} {accountNumber}
				</Text>
				<Text
					style={{
						...TextStyles({ align: 'left' }).regular,
						lineHeight: 20,
					}}
				>
					{balance.toLocaleString()}원
				</Text>
			</View>
			<View>{representativeAccount && <Text>대표</Text>}</View>
			<Portal>
				<Modal
					visible={modalVisible}
					onDismiss={hideModal}
					contentContainerStyle={styles.modalContainer}
				>
					<View style={styles.modalView}>
						<Text style={styles.title}>대표 계좌를 바꾸시겠습니까?</Text>
						<Button mode="contained" onPress={hideModal} style={styles.buttonCancel}>
							아니오
						</Button>
						<Button mode="contained" onPress={changeMainAccount} style={styles.button}>
							예
						</Button>
					</View>
				</Modal>
			</Portal>
		</TouchableOpacity>
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
	},
	title: {
		...TextStyles({ mBottom: 30 }).title,
	},
	buttonCancel: {
		backgroundColor: '#D6D6D6',
		marginBottom: 10,
	},
	button: {
		backgroundColor: '#91C0EB',
	},
});

export default AccountItem;
