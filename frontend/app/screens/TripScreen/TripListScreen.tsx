import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import TripListItem from '../../components/TripListItem/TripListItem';
import TripSwitch from '../../components/TripSwitch/TripSwitch';
import { TripListItemProps } from '../../model/trip';
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
	const [selectionMode, setSelectionMode] = useState('ongoing');

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
			{selectionMode === 'before' && (
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
			)}
			{selectionMode === 'ongoing' && (
				<View style={styles.tripListContainer}>
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
			)}
			{selectionMode === 'end' && (
				<View style={styles.tripListContainer}>
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
			)}
			<View style={styles.switchView}>
				<TripSwitch selectionMode={selectionMode} setSelectionMode={setSelectionMode} />
			</View>
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
	tripListContainer: {
		marginVertical: 10,
		paddingBottom: 60,
	},
	listTitle: {
		...TextStyles({ align: 'left', mBottom: 10 }).medium,
	},
	switchView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		width: '100%',
		bottom: 0,
	},
});

export default TripListScreen;
