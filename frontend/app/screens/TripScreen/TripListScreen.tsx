import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilState } from 'recoil';

import TripListItem from '../../components/TripListItem/TripListItem';
import TripSwitch from '../../components/TripSwitch/TripSwitch';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { TripStackProps } from '../../navigation/TripStack';
import { ongoingTripListState } from '../../recoil/recoil';
import { TextStyles } from '../../styles/CommonStyles';

type TripStackProp = NativeStackScreenProps<TripStackProps, 'TripList'>;

function TripListScreen({ navigation }: TripStackProp) {
	const [searchText, setSearchText] = useState('');
	const [selectionMode, setSelectionMode] = useState('ongoing');

	const [ongoingListState, setOngoingListState] = useRecoilState(ongoingTripListState);
	const api = useAxiosWithAuth();
	useEffect(() => {
		if (selectionMode === 'ongoing') {
			getOngoingTripList();
		}
	}, [selectionMode]);

	const getOngoingTripList = async () => {
		try {
			const res = await api.get(`/travel?type=ongoing&page=0&size=4&sort=createDate,DESC`);

			if (res.status === 200) {
				console.log(res.data);
				const newData = res.data.map((trip: any) => ({
					id: trip.travel_id,
					title: trip.travel_title,
					location: trip.travel_location,
					type: trip.travel_type,
					startDay: trip.start_date,
					endDay: trip.end_date,
				}));
				setOngoingListState(newData);
			}
		} catch (err) {
			console.log(err);
		}
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
			{selectionMode === 'before' && (
				<View style={styles.tripListContainer}>
					<Text style={styles.listTitle}>다가오는 여행</Text>
					{/* {fakeTripListBefore.map((tripBefore, index) => (
						<TripListItem
							key={index}
							title={tripBefore.title}
							nationName={tripBefore.nationName}
							date={tripBefore.date}
							image={tripBefore.image}
						/>
					))} */}
				</View>
			)}
			{selectionMode === 'ongoing' && (
				<View style={styles.tripListContainer}>
					<Text style={styles.listTitle}>여행 중</Text>
					{ongoingListState.map((trip) => (
						<TripListItem
							key={trip.id}
							id={trip.id}
							title={trip.title}
							location={trip.location}
							type={trip.type}
							startDay={trip.startDay}
							endDay={trip.endDay}
							navigation={navigation}
						/>
					))}
				</View>
			)}
			{selectionMode === 'end' && (
				<View style={styles.tripListContainer}>
					<Text style={styles.listTitle}>다녀온 여행</Text>
					{/* {fakeTripListBefore.map((tripBefore, index) => (
						<TripListItem
							key={index}
							title={tripBefore.title}
							nationName={tripBefore.nationName}
							date={tripBefore.date}
							image={tripBefore.image}
						/>
					))} */}
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
