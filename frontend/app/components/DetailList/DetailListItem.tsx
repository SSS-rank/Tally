import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Portal, Modal, Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/AntDesign';

import DetailItemStatus from './DetailItemStatus';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { Payment } from '../../model/payment';
import { TextStyles } from '../../styles/CommonStyles';

type detailItemProps = {
	item: Payment;
	navigation: any;
	setLoad: (status: boolean) => void;
};
function DetailListItem({ item, navigation, setLoad }: detailItemProps) {
	const [modalVisible, setModalVisible] = useState(false);

	const api = useAxiosWithAuth();
	const deleteItem = async () => {
		try {
			const res = await api.patch(`/payment`, {
				payment_uuid: item.payment_uuid,
			});

			if (res.status === 200) {
				setLoad(true);
				setModalVisible(false);
			}
		} catch (err: any) {
			console.error(err.response);
		}
	};

	const openDeleteItemModal = () => {
		if (item.calculate_status === 'ONGOING' || item.calculate_status === 'AFTER') {
			Alert.alert('', '정산 중, 정산 완료 내역은 삭제할 수 없습니다');
		} else setModalVisible(true);
	};

	return (
		<TouchableOpacity
			style={styles.itemContainer}
			onPress={() =>
				navigation.navigate('ModifyPayment', {
					payment_uuid: item.payment_uuid,
					payer: item.payer,
					method: item.payment_method,
				})
			}
			onLongPress={openDeleteItemModal}
		>
			<Text style={[styles.info, { marginBottom: 3 }]}>{item.payment_date.split('T')[0]}</Text>
			<View style={styles.detail_item_main}>
				<View style={styles.title_status}>
					<Text style={styles.paymentName}>{item.payment_name}</Text>
					{item.calculate_status != 'NONE' ? (
						<DetailItemStatus status={item.calculate_status} />
					) : null}
					{!item.visible ? <Icon style={styles.lock} name="lock" /> : null}
				</View>

				<Text style={styles.money}>{item.amount.toLocaleString()}원</Text>
			</View>
			<View style={styles.detail_item_sub}>
				<Text style={styles.info}>{item.payment_date.split('T')[1]}</Text>
				<Text style={styles.info}>{item.participants ? item.participants.join(',') : ''}</Text>
			</View>
			<Portal>
				<Modal
					visible={modalVisible}
					onDismiss={() => setModalVisible(false)}
					contentContainerStyle={styles.modalContainer}
				>
					<View style={styles.modalView}>
						<Text style={styles.modalHeaderText}>
							{`거래 내역을 여행지 거래 내역에서 \n 삭제하시겠습니까?`}
						</Text>
						<Text style={styles.modalText}>
							{`삭제한 거래 내역은 해당 여행지의 소비에 포함되지 않습니다.`}
						</Text>
						<Button mode="contained" style={styles.modalBtn} onPress={deleteItem}>
							삭제
						</Button>
					</View>
				</Modal>
			</Portal>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	itemContainer: {
		marginBottom: 20,
	},
	paymentName: {
		...TextStyles({ align: 'left', weight: 'bold' }).title,
	},
	info: {
		...TextStyles({ align: 'left', color: '#666666' }).small,
	},
	money: {
		...TextStyles({ align: 'left', weight: 'bold' }).medium,
	},
	title_status: {
		flexDirection: 'row',
	},
	detail_item_main: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 5,
	},
	detail_item_sub: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	lock: {
		marginLeft: 5,
		fontSize: 20,
		justifyContent: 'center',
	},
	modalContainer: {
		width: '100%',
		paddingHorizontal: 20,
	},
	modalView: {
		backgroundColor: '#ffffff',
		// height: '50%',
		borderRadius: 8,
		paddingVertical: 30,
		paddingHorizontal: 18,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalHeaderText: {
		...TextStyles({ mBottom: 10 }).title,
	},
	modalText: {
		...TextStyles({ mBottom: 20 }).small,
	},
	modalBtn: {
		width: '100%',
		backgroundColor: '#DC3545',
	},
});
export default DetailListItem;
