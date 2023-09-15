import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { TripStackProps } from '../../navigation/TripStack';

type TripStackProp = NativeStackScreenProps<TripStackProps, 'TripList'>;

function TripListScreen({ navigation }: TripStackProp) {
	const [searchText, setSearchText] = useState('');

	return (
		<>
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
				<View>{/* TODO : 여행지 생성 버튼 */}</View>
				<View>{/* TODO : 다가오는 여행 */}</View>
				<View>{/* TODO : ㅇ행 중 */}</View>
				<View>{/* TODO : 여행지 생성 버튼 */}</View>
				<Button title="여행 추가" onPress={() => navigation.navigate('CreateTrip')} />
				<Button title="상세" onPress={() => navigation.navigate('TripDetail')} />
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		margin: 15,
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
});

export default TripListScreen;
