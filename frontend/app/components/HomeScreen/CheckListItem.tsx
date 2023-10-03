import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
	Modal,
	Pressable,
	TextInput,
} from 'react-native';
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
	const [modifyModalVisible, setModifyModalVisible] = useState(false);
	const [itemName, setItemName] = useState(content);
	const api = useAxiosWithAuth();

	const reset = () => {
		setItemName('');
	};

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
		<>
			<TouchableOpacity style={styles.itemContainer} onPress={toggleItemStatus}>
				<View style={styles.row}>
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
				<View style={styles.row}>
					<Button mode="text" textColor="#91C0EB" onPress={() => setModifyModalVisible(true)}>
						수정
					</Button>
					<IconButton icon="close" iconColor="#b3261e" onPress={deleteCheckListItem} />
				</View>
			</TouchableOpacity>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modifyModalVisible}
				onRequestClose={() => {
					setModifyModalVisible(!modifyModalVisible);
				}}
			>
				<Pressable
					style={{ backgroundColor: '#00000070', flex: 1 }}
					onPress={() => setModifyModalVisible(!modifyModalVisible)}
				/>
				<View style={styles.modalView}>
					<View style={styles.modalHeader}>
						<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).regular, flex: 1 }}>
							체크리스트 수정
						</Text>
						<Icon
							name="close"
							size={32}
							color={'#666666'}
							onPress={() => setModifyModalVisible(!modifyModalVisible)}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							style={styles.textInput}
							value={itemName}
							onChangeText={setItemName}
							autoFocus={true}
						/>
						<Icon name="close-circle" style={styles.resetIcon} onPress={reset} />
					</View>
					<Button mode="contained" style={styles.addCheckListItemBtn}>
						확인
					</Button>
				</View>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		...TextStyles({ align: 'left' }).regular,
	},
	deleteBtn: {
		color: '#b3261e',
	},
	modalView: {
		width: '100%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: 'white',
		padding: 35,
		position: 'absolute',
		bottom: 0,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	modalHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 40,
	},
	inputView: {
		position: 'relative',
		width: '100%',
	},
	textInput: {
		backgroundColor: '#ffffff',
		height: 40,
		borderBottomWidth: 1,
		width: '100%',
		borderBottomColor: '#666666',
		...TextStyles({ align: 'left' }).regular,
	},
	resetIcon: {
		color: '#666666',
		fontSize: 20,
		position: 'absolute',
		bottom: 10,
		right: 10,
	},
	addCheckListItemBtn: {
		width: '100%',
		backgroundColor: '#91C0EB',
		...TextStyles({ align: 'left', color: '#ffffff' }).regular,
		marginTop: 30,
	},
});

export default CheckListItem;
