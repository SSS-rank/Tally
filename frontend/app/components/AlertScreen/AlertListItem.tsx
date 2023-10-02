import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { AlertItem } from '../../model/alert';
import { TextStyles } from '../../styles/CommonStyles';

interface AlertListItemProp {
	item: AlertItem;
}

interface AlertContent {
	typeColor: string;
	typeName: string;
	date: string;
	message: string;
}

function AlertListItem({ item }: AlertListItemProp) {
	const [alertContent, setAlertContent] = useState<AlertContent>({
		typeColor: '#232323',
		typeName: '',
		date: '',
		message: '',
	});

	useEffect(() => {
		getAlertContent(item.type);
	}, [item]);
	const getAlertContent = (type: string) => {
		let color = '';
		let name = '';
		const splitDate = item.createdTime.split(' ')[0].split('-');
		const date = `${splitDate[1]}월 ${splitDate[2]}일`;
		let msg = '';

		if (type === 'payment-request') {
			color = '#FDDE61';
			name = '더치페이';
			msg = `${item.senderName}님이 ${item.travelName}의 ${item.paymentName} 결제의 금액 조정을 요청했어요.`;
		} else if (type === 'calculate-request') {
			color = '#B949F6';
			name = '정산';
			msg = `${item.travelName} 여행의 ${item.senderName}님이 정산을 요청했어요.`;
		} else if (type === 'calculate-reject') {
			color = '#B949F6';
			name = '정산';
			msg = `${item.travelName} 여행의 ${item.senderName}님이 정산을 거절했어요.`;
		} else if (type === 'calculate-complete') {
			color = '#B949F6';
			name = '정산';
			msg = `${item.travelName} 여행의 ${item.senderName}님이 요청한 정산이 완료 됐어요.`;
		} else if (type === 'calculate-cancel') {
			color = '#B949F6';
			name = '정산';
			msg = `${item.travelName} 여행의 ${item.senderName}님이 선택한 계좌에 잔액이 부족해요. 확인 후 다시 정산을 요청해 주세요.`;
		} else if (type === 'travel-add') {
			color = '#227CF8';
			name = '초대';
			msg = `${item.senderName}님이 ${item.travelName} 여행에 참여했어요.`;
		}

		setAlertContent({ typeColor: color, typeName: name, date, message: msg });
	};

	return (
		<View style={styles.itemContainer}>
			<View style={styles.row}>
				<Icon name="heart" size={20} color={alertContent.typeColor} />
				<Text style={styles.type}>{alertContent.typeName}</Text>
				<Text style={styles.date}>{alertContent.date}</Text>
			</View>
			<Text style={styles.message}>{alertContent.message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		backgroundColor: '#ffffff',
		paddingHorizontal: 15,
		width: '100%',
		marginVertical: 12,
	},
	row: {
		flexDirection: 'row',
	},
	type: {
		...TextStyles({ align: 'left', mLeft: 5, color: '#A0A0A0' }).small,
	},
	date: {
		...TextStyles({ align: 'right', color: '#A0A0A0' }).small,
		marginLeft: 'auto',
	},
	message: {
		...TextStyles({ align: 'left', mTop: 8, mBottom: 10 }).regular,
	},
});
export default AlertListItem;
