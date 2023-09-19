import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Chip } from 'react-native-paper';

function DetailItemStatus() {
	return <Chip style={styles.chip}>정산중</Chip>;
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
