import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { TextStyles } from '../../styles/CommonStyles';

function AlertListItem() {
	return (
		<View style={styles.itemContainer}>
			<View style={styles.row}>
				<Text style={styles.type}>💜</Text>
				<Text style={styles.type}>정산</Text>
				<Text style={styles.date}>9월 5일</Text>
			</View>
			<View>
				<Text style={styles.message}>
					박싸피님이 80000원을 요청했어요. 정산 내역을 확인해보세요
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		backgroundColor: '#ffffff',
		paddingHorizontal: 15,
		width: '100%',
	},
	row: {
		flexDirection: 'row',
	},
	type: {
		...TextStyles({ align: 'left' }).small,
	},
	date: {
		...TextStyles({ align: 'right', color: '#d9d9d9' }).small,
	},
	message: {
		...TextStyles({ align: 'left', mLeft: 20, mTop: 10, mBottom: 10 }).regular,
	},
});
export default AlertListItem;
