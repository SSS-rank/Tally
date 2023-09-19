import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Portal, Modal } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import TripListFilter from '../../components/TripListFilter/TripListFilter';
import TripListItem from '../../components/TripListItem/TripListItem';
import { TripListItemProps } from '../../model/tripListItem';
import { TripStackProps } from '../../navigation/TripStack';
import { TextStyles } from '../../styles/CommonStyles';

type TripStackProp = NativeStackScreenProps<TripStackProps, 'TripList'>;

const fakeTripListBefore: TripListItemProps[] = [
	{
		title: '축구보러 가자',
		nationName: '영국',
		date: '2023.09.01 ~ 2023.09.03',
		image: '../../assets/images/kakao.png',
	},
	{
		title: '부산 호캉스',
		nationName: '',
		date: '2023.09.01 ~ 2023.09.03',
		image: '../../assets/images/kakao.png',
	},
];

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
		<ScrollView style={styles.viewContainer}>
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
						<Text style={TextStyles({ align: 'left' }).medium}>여행 만들기</Text>
						<Text style={TextStyles({ align: 'left', color: '#666666' }).small}>
							여행을 등록하고 떠나보세요
						</Text>
					</View>
				</View>
			</TouchableOpacity>
			<Button
				icon="chevron-down"
				mode="text"
				onPress={openFilter}
				style={{ alignItems: 'flex-start', marginBottom: 5 }}
				contentStyle={{ flexDirection: 'row-reverse' }}
				labelStyle={TextStyles({ align: 'left', color: '#666666' }).regular}
			>
				필터
			</Button>
			<View style={styles.tripListContainer}>
				<Text style={styles.listTitle}>다가오는 여행</Text>
				{fakeTripListBefore.map((tripBefore, index) => (
					<TripListItem
						key={index}
						title={tripBefore.title}
						nationName={tripBefore.nationName}
						date={tripBefore.date}
						image={tripBefore.image}
					/>
				))}
			</View>
			<View>
				<Text style={styles.listTitle}>여행 중</Text>
				{fakeTripListBefore.map((tripBefore, index) => (
					<TripListItem
						key={index}
						title={tripBefore.title}
						nationName={tripBefore.nationName}
						date={tripBefore.date}
						image={tripBefore.image}
					/>
				))}
			</View>
			<View>
				<Text style={styles.listTitle}>다녀온 여행</Text>
				{fakeTripListBefore.map((tripBefore, index) => (
					<TripListItem
						key={index}
						title={tripBefore.title}
						nationName={tripBefore.nationName}
						date={tripBefore.date}
						image={tripBefore.image}
					/>
				))}
			</View>
			{/* <Button title="여행 추가" onPress={() => navigation.navigate('CreateTrip')} />
				<Button title="상세" onPress={() => navigation.navigate('TripDetail')} /> */}

			<Portal>
				<Modal
					visible={modalVisible}
					onDismiss={hideModal}
					contentContainerStyle={styles.modalContainer}
				>
					<View style={styles.modalView}>
						<Text style={styles.filterTitle}>필터 선택</Text>
						<TripListFilter filterName="다가오는 여행" />
						<TripListFilter filterName="여행 중" />
						<TripListFilter filterName="다가오는 여행" />
					</View>
				</Modal>
			</Portal>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		padding: 15,
		backgroundColor: '#ffffff',
	},
	titleText: TextStyles({ align: 'left', mBottom: 30, weight: 'bold' }).header,
	searchView: {
		position: 'relative',
	},
	searchBar: {
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#d9d9d9',
		...TextStyles({ align: 'left' }).regular,
		marginBottom: 40,
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
	tripListContainer: {
		marginVertical: 10,
	},
	filterTitle: {
		...TextStyles({ align: 'left', weight: 'bold' }).title,
		marginVertical: 16,
	},
	listTitle: {
		...TextStyles({ align: 'left', mBottom: 10 }).medium,
	},
});

export default TripListScreen;
