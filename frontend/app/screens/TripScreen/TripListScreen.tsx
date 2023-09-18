import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Button, Portal, Modal } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import TripListFilter from '../../components/TripListFilter/TripListFilter';
import { TripStackProps } from '../../navigation/TripStack';

type TripStackProp = NativeStackScreenProps<TripStackProps, 'TripList'>;

function TripListScreen({ navigation }: TripStackProp) {
	const [searchText, setSearchText] = useState('');
	const [modalVisible, setModalVisible] = useState(false);

	const openFilter = () => {
		setModalVisible(true);
	};

	const hideModal = () => {
		setModalVisible(false);
	};

	return (
		<View style={styles.viewContainer}>
			<View>
				<Text style={styles.titleText}>나의 여행지</Text>
				<View style={styles.searchView}>
					<TextInput
						style={styles.searchBar}
						placeholder="검색어를 입력해주세요"
						onChangeText={setSearchText}
						value={searchText}
					/>
					<Icon name="search" style={styles.searchIcon} />
				</View>
			</View>
			<TouchableOpacity style={styles.tripAddBtn} onPress={() => navigation.navigate('CreateTrip')}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<MaterialIcon
						name="plus-circle"
						size={48}
						style={{ color: '#91C0EB', marginRight: 10 }}
					/>
					<View>
						<Text style={{ fontSize: 18, fontWeight: '500', color: '#232323' }}>여행 만들기</Text>
						<Text style={{ fontSize: 14, fontWeight: '500', color: '#666666' }}>
							여행을 등록하고 떠나보세요
						</Text>
					</View>
				</View>
			</TouchableOpacity>
			<Button
				icon="chevron-down"
				mode="text"
				onPress={openFilter}
				textColor="#666666"
				style={{ alignItems: 'flex-start' }}
				contentStyle={{ flexDirection: 'row-reverse' }}
				labelStyle={{ fontSize: 18, textAlign: 'left' }}
			>
				필터
			</Button>
			<View>{/* TODO : 다가오는 여행 */}</View>
			<View>{/* TODO : ㅇ행 중 */}</View>
			<View>{/* TODO : 여행지 생성 버튼 */}</View>
			{/* <Button title="여행 추가" onPress={() => navigation.navigate('CreateTrip')} />
				<Button title="상세" onPress={() => navigation.navigate('TripDetail')} /> */}

			<Portal>
				<Modal
					visible={modalVisible}
					onDismiss={hideModal}
					contentContainerStyle={styles.modalContainer}
				>
					<View style={styles.modalView}>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 16, color: '#232323' }}
						>
							필터 선택
						</Text>
						<TripListFilter filterName="다가오는 여행" />
						<TripListFilter filterName="여행 중" />
						<TripListFilter filterName="다가오는 여행" />
					</View>
				</Modal>
			</Portal>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		padding: 15,
		backgroundColor: '#ffffff',
	},
	titleText: { fontSize: 30, fontWeight: 'bold', marginBottom: 30, color: '#232323' },
	searchView: {
		position: 'relative',
	},
	searchBar: {
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#d9d9d9',
		marginBottom: 40,
		fontSize: 18,
		position: 'relative',
		bottom: 0,
	},
	searchIcon: {
		color: '#666',
		fontSize: 20,
		position: 'absolute',
		bottom: 55,
		right: 10,
	},
	tripAddBtn: {
		backgroundColor: '#F6F6F6',
		color: '#232323',
		borderRadius: 8,
		paddingVertical: 15,
		paddingHorizontal: 20,
		marginBottom: 40,
	},
	modalContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
	},
	modalView: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 20,
	},
});

export default TripListScreen;
