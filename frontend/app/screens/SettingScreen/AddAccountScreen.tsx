import React, { useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	Alert,
	Modal,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import { Button, Avatar } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TextStyles } from '../../styles/CommonStyles';

function AddAccountScreen() {
	const [modalVisible, setModalVisible] = useState(false);
	const [name, setName] = useState('');
	const reset = () => {
		setName('');
	};
	return (
		<View style={styles.viewContainer}>
			<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).title }}>
				내역을 확인할 수 있는{'\n'}계좌의 정보를 입력해주세요.
			</Text>
			<Text style={{ ...TextStyles({ align: 'left', mBottom: 10, color: '#666666' }).small }}>
				본인인증을 위해 계좌 인증이 필요합니다.
			</Text>
			<View style={styles.sectionView}>
				<Pressable onPress={() => setModalVisible(true)}>
					<Text style={TextStyles({ align: 'left', color: '#91C0EB' }).regular}>
						<MaterialCommunityIcons name="bank-plus" color={'#91C0EB'} size={26} />
						은행 선택
					</Text>
				</Pressable>
				<View style={styles.searchView}>
					<TextInput
						style={{
							...TextStyles({ align: 'left' }).regular,
							flex: 1,
						}}
						value={name}
						onChangeText={setName}
						placeholder="계좌 번호"
						keyboardType="number-pad"
					/>
					<Icon
						name="close-circle"
						style={{
							color: '#666666',
							fontSize: 24,
						}}
						onPress={reset}
					/>
				</View>
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).regular, flex: 1 }}>
								은행 선택
							</Text>
							<Icon
								name="close"
								size={32}
								color={'#666666'}
								onPress={() => setModalVisible(!modalVisible)}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		backgroundColor: 'white',
		paddingHorizontal: 15,
	},
	sectionView: {
		marginVertical: 10,
	},
	searchView: {
		alignItems: 'center',
		borderBottomColor: '#A0A0A0',
		borderBottomWidth: 0.5,
		flexDirection: 'row',
	},
	title: {
		...TextStyles({ align: 'left', weight: 'bold' }).regular,
	},

	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000070',
	},
	modalView: {
		marginTop: '50%',
		flex: 1,
		width: '100%',
		// margin: 20,
		// borderRadius: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: 'white',

		padding: 35,
		// alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#91C0EB',
		padding: 10,
		elevation: 3,
		backgroundColor: '#FFFFFF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: '#',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});
export default AddAccountScreen;
