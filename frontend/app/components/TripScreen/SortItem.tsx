import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { TextStyles } from '../../styles/CommonStyles';

interface SortItemProp {
	text: string;
	orderType: string;
	setOrderType: (type: string) => void;
	setModalVisible: (status: boolean) => void;
}

function SortItem({ text, orderType, setOrderType, setModalVisible }: SortItemProp) {
	const handleOnPress = () => {
		setOrderType(text);
		setModalVisible(false);
	};

	return (
		<TouchableOpacity style={styles.itemContainer} onPress={handleOnPress}>
			<Text style={styles.text}>{text}</Text>
			{text === orderType && <Icon name="check" size={30} color="#91C0EB" />}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	text: {
		...TextStyles({ align: 'left' }).regular,
	},
});

export default SortItem;
