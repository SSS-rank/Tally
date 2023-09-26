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
	return <Chip style={styles.chip}>{text}</Chip>;
}
const styles = StyleSheet.create({
	chip: {
		height: 30,
		width: 75,
		marginLeft: 10,
		marginTop: 0,
		marginBottom: 10,
		justifyContent: 'center',
	},
});
export default DetailItemStatus;
