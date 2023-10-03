import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, Pressable, TextInput } from 'react-native';
import { Button, Chip } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilState } from 'recoil';

import DashLine from '../../components/DashLine';
import CheckListItem from '../../components/HomeScreen/CheckListItem';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { CustomCheckListItem } from '../../model/checkList';
import { CheckListScreenProps } from '../../model/homeNavigator';
import { CheckListState } from '../../recoil/checkListRecoil';
import { TextStyles } from '../../styles/CommonStyles';

function CheckListScreen({ route }: CheckListScreenProps) {
	const { travel_id, travel_title, start_date, end_date } = route.params;
	const [customCheckList, setCustomCheckList] = useRecoilState(CheckListState);
	const [modalVisible, setModalVisible] = useState(false);
	const [itemName, setItemName] = useState('');
	const api = useAxiosWithAuth();

	useFocusEffect(
		useCallback(() => {
			getCustomCheckList();
			// if (customCheckList[travel_id] === undefined) getCustomCheckList();
		}, []),
	);

	const getCustomCheckList = async () => {
		try {
			const res = await api.get(`/custom-checklist/${travel_id}`);

			if (res.status === 200) {
				const newData: CustomCheckListItem[] = res.data.map((item: any) => ({
					...item,
					status: false,
				}));

				const updatedDefaultCheckList = { ...customCheckList };
				updatedDefaultCheckList[travel_id] = {
					checkListItem: newData,
				};

				setCustomCheckList(updatedDefaultCheckList);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	const reset = () => {
		setItemName('');
	};

	const addCheckListItem = async () => {
		try {
			const res = await api.post(`/custom-checklist`, {
				travel_id: travel_id,
				content: itemName,
			});

			if (res.status === 200) {
				console.log(res.data);
				setModalVisible(false);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	return (
		<View style={styles.viewContainer}>
			<View style={styles.topView}>
				<Text style={styles.title}>{travel_title}</Text>
				<Text style={styles.date}>
					{start_date} ~ {end_date}
				</Text>
			</View>

			<DashLine />
			<View style={styles.buttonView}>
				<Chip
					style={styles.addBtn}
					textStyle={{ color: '#ffffff' }}
					onPress={() => setModalVisible(true)}
				>
					<Icon name="plus" size={16} style={{ color: '#ffffff', textAlignVertical: 'center' }} />{' '}
					체크리스트 추가하기
				</Chip>
			</View>
			<FlatList
				data={customCheckList && customCheckList[travel_id]?.checkListItem}
				renderItem={({ item }) => (
					<CheckListItem
						travel_id={travel_id}
						custom_check_list_id={item.custom_check_list_id}
						content={item.content}
						status={item.status}
					/>
				)}
				keyExtractor={(item) => String(item.custom_check_list_id)}
			/>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false);
				}}
			>
				<Pressable
					style={{ backgroundColor: '#00000070', flex: 1 }}
					onPress={() => setModalVisible(false)}
				/>
				<View style={styles.modalView}>
					<View style={styles.modalHeader}>
						<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).regular, flex: 1 }}>
							체크리스트 추가
						</Text>
						<Icon name="close" size={32} color={'#666666'} onPress={() => setModalVisible(false)} />
					</View>
					<View style={styles.inputView}>
						<TextInput
							style={styles.textInput}
							value={itemName}
							onChangeText={setItemName}
							placeholder="추가할 체크리스트 항목을 입력해주세요"
						/>
						<Icon name="close-circle" style={styles.resetIcon} onPress={reset} />
					</View>
					<Button mode="contained" style={styles.addCheckListItemBtn} onPress={addCheckListItem}>
						확인
					</Button>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		padding: 15,
		backgroundColor: '#ffffff',
	},
	topView: {
		marginBottom: 20,
	},
	title: {
		...TextStyles({ align: 'left', weight: 'bold', mBottom: 5 }).header,
	},
	date: {
		...TextStyles({ align: 'left', color: '#A0A0A0' }).small,
	},
	buttonView: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	addBtn: {
		borderColor: '#91C0EB',
		borderRadius: 32,
		padding: 0,
		borderWidth: 1,
		backgroundColor: '#91C0EB',
		width: 'auto',
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
export default CheckListScreen;
