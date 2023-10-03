import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { TextStyles } from '../../styles/CommonStyles';

function CheckListItem() {
	const [isChecked, setIsChecked] = useState(false);
	return (
		<TouchableOpacity style={styles.itemContainer} onPress={() => setIsChecked(!isChecked)}>
			<View style={styles.leftView}>
				<Icon
					name={isChecked ? 'check-circle' : 'checkbox-blank-circle-outline'}
					size={28}
					style={{ marginRight: 5 }}
					color={isChecked ? '#91C0EB' : '#D0D0D0'}
				/>
				<Text style={[styles.text, isChecked ? { textDecorationLine: 'line-through' } : {}]}>
					휴대폰 충전기
				</Text>
			</View>
			<IconButton icon="close" iconColor="#b3261e" onPress={() => console.log('삭제')} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	leftView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		...TextStyles({ align: 'left' }).regular,
	},
	deleteBtn: {
		color: '#b3261e',
	},
});

export default CheckListItem;
