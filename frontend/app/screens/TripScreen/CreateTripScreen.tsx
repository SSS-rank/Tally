import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';
import { useRecoilState, useSetRecoilState } from 'recoil';

import TripDateInput from '../../components/TripDateInput/TripDateInput';
import TripLocationSelect from '../../components/TripLocationSelect/TripLocationSelect';
import { TripInfoState } from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';

function CreateTripScreen() {
	const [title, setTitle] = useState('');

	const changeName = (value: string) => {
		setTitle(value);

		const updatedTripInfo = { ...tripInfo, title: value };
		setTripInfo(updatedTripInfo);
	};

	const reset = () => {
		setTitle('');
	};

	const [tripInfo, setTripInfo] = useRecoilState(TripInfoState);
	const regist = () => {
		console.log('여행지 등록하기');
		console.log(tripInfo);
	};

	return (
		<View style={styles.viewContainer}>
			<View style={styles.sectionView}>
				<Text style={styles.title}>여행지 별명 등록</Text>
				<View style={styles.searchView}>
					<TextInput
						style={styles.nameInput}
						value={title}
						onChangeText={changeName}
						placeholder="별명을 입력해주세요"
					/>
					<Icon name="close-circle" style={styles.closeIcon} onPress={reset} />
				</View>
			</View>
			<View style={styles.sectionView}>
				<Text style={styles.title}>여행지 등록</Text>
				<TripLocationSelect />
			</View>
			<View style={styles.sectionView}>
				<Text style={styles.title}>여행 일정 등록</Text>
				<TripDateInput />
			</View>
			<Button mode="contained" style={styles.registBtn} onPress={regist}>
				확인
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		padding: 15,
		backgroundColor: '#ffffff',
	},
	sectionView: {
		marginTop: 10,
		marginBottom: 40,
	},
	searchView: {
		position: 'relative',
	},
	closeIcon: {
		color: '#666666',
		fontSize: 20,
		position: 'absolute',
		bottom: 10,
		right: 10,
	},
	title: {
		...TextStyles({ align: 'left', weight: 'bold', mBottom: 20 }).title,
	},
	nameInput: {
		borderBottomColor: '#666666',
		borderBottomWidth: 1,
		paddingHorizontal: 15,
		...TextStyles({ align: 'left' }).regular,
	},
	registBtn: {
		backgroundColor: '#91C0EB',
		borderRadius: 4,
	},
});

export default CreateTripScreen;
