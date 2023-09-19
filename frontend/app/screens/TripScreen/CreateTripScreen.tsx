import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import TripDateInput from '../../components/TripDateInput/TripDateInput';
import TripLocationSelect from '../../components/TripLocationSelect/TripLocationSelect';
import { TextStyles } from '../../styles/CommonStyles';

function CreateTripScreen() {
	const [name, setName] = useState('');
	const reset = () => {
		setName('');
	};

	return (
		<View style={styles.viewContainer}>
			<View style={styles.sectionView}>
				<Text style={styles.title}>여행지 별명 등록</Text>
				<View style={styles.searchView}>
					<TextInput style={styles.nameInput} value={name} onChangeText={setName} />
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
		color: 'rgba(102,102,102,0.6)',
		fontSize: 20,
		position: 'absolute',
		bottom: 10,
		right: 10,
	},
	title: {
		...TextStyles({ align: 'left', weight: 'bold', mBottom: 20 }).title,
	},
	nameInput: {
		borderBottomColor: 'rgba(102,102,102,0.6)',
		borderBottomWidth: 1,
		paddingHorizontal: 15,
	},
});

export default CreateTripScreen;
