import React, { useCallback, useState } from 'react';
import { Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Button } from 'react-native-paper';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Carousel from '../../components/Carousel';
import ProfileBox from '../../components/HomeScreen/ProfileBox';
import TravelSheet from '../../components/HomeScreen/TravelSheet';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { TextStyles } from '../../styles/CommonStyles';
import { HomeStyles, ViewStyles } from '../../styles/HomeStyles';

const width = Dimensions.get('window').width - 70;

const fakeWeatherData = ['Rain', 'Sunny', 'Snow'];

function HomeScreen({ navigation }: any) {
	const [page, setPage] = useState(0);
	const [afterTripList, setAfterTripList] = useState([]);

	useFocusEffect(
		useCallback(() => {
			getTripData();
		}, []),
	);

	const api = useAxiosWithAuth();
	const getTripData = async () => {
		const res = await api.get(`/travel/info`);

		const newInfo = res.data.map((item: any, index: number) => ({
			...item,
			travelParticipants: item.travelParticipants.map((member: any) => ({
				member_uuid: member.member_uuid,
				nickname: member.member_nickname,
				profile_image: member.image,
			})),
			color: fakeWeatherData[index] === 'Sunny' ? ['#ffffff', '#ffffff'] : ['#cfd9df', '#e2ebf0'],
			width: width,
			weather: fakeWeatherData[index],
		}));
		setAfterTripList(newInfo);
	};

	return (
		<View style={HomeStyles.container}>
			<ScrollView style={HomeStyles.scrollView}>
				<View style={ViewStyles().header}>
					<Icon
						name="settings-sharp"
						size={24}
						color="#91C0EB"
						onPress={() => navigation.navigate('Setting')}
					/>
				</View>
				<ProfileBox />

				<View>
					<Carousel
						page={page}
						setPage={setPage}
						gap={10}
						data={afterTripList}
						pageWidth={width}
						RenderItem={TravelSheet}
					/>
				</View>
				<View style={ViewStyles({ justifyContent: 'flex-start' }).box}>
					<Text style={TextStyles().title}>여행 도우미</Text>
					<Text style={TextStyles().small}>여행에 도움이 되는정보를 찾아보세요</Text>
					<View
						style={{
							flex: 1,
							alignSelf: 'flex-end',
							flexDirection: 'column-reverse',
						}}
					>
						<Icon name="information-circle-outline" size={54} color="#4F8EF7" />
					</View>
				</View>
				<View style={ViewStyles({ color: 'green' }).box} />
				<View style={ViewStyles({ color: 'blue' }).box} />
				<View style={ViewStyles({ color: 'red' }).box} />
				<View style={ViewStyles({ color: 'blue' }).box} />
			</ScrollView>

			{/* <View style={styles.Box1} />
      <View style={styles.viewRowContainer}>
        <View style={styles.Box2} />
        <View style={styles.Box3} />
      </View> */}
		</View>
	);
}

const RainbowSheet = [
	{
		id: 0,
		color: '#91C0EB',
		dday: 6,
		title: '싸피 졸업 여행',
		startDate: '2023.09.11',
		endDate: '2023.09.15',
		balance: 675455,
		profile1: '',
		profile2: '',
		profile3: '',
	},
	{
		id: 1,
		color: '#91C0EB',
		dday: 6,
		title: '싸피 졸업 여행',
		startDate: '2023.09.11',
		endDate: '2023.09.15',
		balance: 675455,
		profile1: '',
		profile2: '',
		profile3: '',
	},
	{
		id: 2,
		color: '#91C0EB',
		dday: 6,
		title: '싸피 졸업 여행',
		startDate: '2023.09.11',
		endDate: '2023.09.15',
		balance: 675455,
		profile1: '',
		profile2: '',
		profile3: '',
	},
	{
		id: 3,
		color: '#91C0EB',
		dday: 6,
		title: '싸피 졸업 여행',
		startDate: '2023.09.11',
		endDate: '2023.09.15',
		balance: 675455,
		profile1: '',
		profile2: '',
		profile3: '',
	},
	{
		id: 4,
		color: '#91C0EB',
		dday: 6,
		title: '싸피 졸업 여행',
		startDate: '2023.09.11',
		endDate: '2023.09.15',
		balance: 675455,
		profile1: '',
		profile2: '',
		profile3: '',
	},
];

export default HomeScreen;
