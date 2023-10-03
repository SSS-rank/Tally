import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilState } from 'recoil';

import { CustomCheckListItem } from '../../model/checkList';
import { CheckListState } from '../../recoil/checkListRecoil';
import { TextStyles } from '../../styles/CommonStyles';

interface CheckListItemProp extends CustomCheckListItem {
	travel_id: number;
}

function CheckListItem({ travel_id, custom_check_list_id, content, status }: CheckListItemProp) {
	const [checkList, setCheckList] = useRecoilState(CheckListState);
	const [isCheckted, setIsChecked] = useState(status);
	const toggleItemStatus = () => {
		const updatedCheckListItem = checkList[travel_id].checkListItem.map((item) => {
			setIsChecked(!isCheckted);
			if (item.custom_check_list_id === custom_check_list_id) {
				return {
					...item,
					status: !isCheckted,
				};
			} else
				return {
					...item,
				};
		});

		const updatedCheckList = { ...checkList };
		updatedCheckList[travel_id] = {
			checkListItem: updatedCheckListItem,
		};
		setCheckList(updatedCheckList);
	};

	return (
		<TouchableOpacity style={styles.itemContainer} onPress={toggleItemStatus}>
			<View style={styles.leftView}>
				<Icon
					name={isCheckted ? 'check-circle' : 'checkbox-blank-circle-outline'}
					size={28}
					style={{ marginRight: 5 }}
					color={isCheckted ? '#91C0EB' : '#D0D0D0'}
				/>
				<Text style={[styles.text, isCheckted ? { textDecorationLine: 'line-through' } : {}]}>
					{content}
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
