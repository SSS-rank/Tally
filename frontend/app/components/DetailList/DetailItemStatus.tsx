import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
// 정산 상태(NONE, BEFORE, ONGOING, AFTER)
interface status {
	status: string;
}
function DetailItemStatus(props: status) {
	let text = '';
	if (props.status == 'BEFORE') {
		text = '정산 전';
	} else if (props.status == 'ONGOING') {
		text = '정산 중';
	} else if (props.status == 'AFTER') {
		text = '정산 완료';
	}
	return (
		<>
			{props.status === 'BEFORE' && (
				<Chip
					style={[styles.chip, { backgroundColor: '#F6F6F6' }]}
					textStyle={{ color: '#91C0EB' }}
				>
					{text}
				</Chip>
			)}
			{props.status === 'ONGOING' && (
				<Chip
					style={[styles.chip, { backgroundColor: '#91C0EB' }]}
					textStyle={{ color: '#ffffff' }}
				>
					{text}
				</Chip>
			)}
			{props.status === 'AFTER' && (
				<Chip
					style={[styles.chip, { backgroundColor: '#D9D9D9' }]}
					textStyle={{ color: '#ffffff' }}
				>
					{text}
				</Chip>
			)}
		</>
	);
}
const styles = StyleSheet.create({
	chip: {
		borderRadius: 32,
		marginLeft: 10,
		marginTop: 0,
		marginBottom: 10,
		justifyContent: 'center',
	},
});
export default DetailItemStatus;
