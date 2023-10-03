import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilState } from 'recoil';

import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { CustomCheckListItem } from '../../model/checkList';
import { CheckListState } from '../../recoil/checkListRecoil';
import { TextStyles } from '../../styles/CommonStyles';

interface CheckListItemProp extends CustomCheckListItem {
	travel_id: number;
	setLoad: (value: boolean) => void;
}

function CheckListItem({
	travel_id,
	custom_check_list_id,
	content,
	status,
	setLoad,
}: CheckListItemProp) {
	const [checkList, setCheckList] = useRecoilState(CheckListState);
	const [isCheckted, setIsChecked] = useState(status);
	const api = useAxiosWithAuth();

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

	const deleteCheckListItem = () => {
		try {
			Alert.alert('', '선택한 체크리스트를 삭제하겠습니까?', [
				{ text: '취소' },
				{
					text: '삭제',
					onPress: async () => {
						const res = await api.delete(`/custom-checklist/${custom_check_list_id}`);
						if (res.status === 200) {
							setLoad(true);
							Alert.alert('성공적으로 삭제되었습니다.');
						}
					},
				},
			]);
		} catch (err: any) {
			console.error(err);
		}
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
			<IconButton icon="close" iconColor="#b3261e" onPress={deleteCheckListItem} />
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
