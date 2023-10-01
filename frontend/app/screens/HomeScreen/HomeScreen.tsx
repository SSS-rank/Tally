import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Button } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilState, useRecoilValue } from 'recoil';

import Carousel from '../../components/Carousel';
import ProfileBox from '../../components/HomeScreen/ProfileBox';
import TravelSheet from '../../components/HomeScreen/TravelSheet';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { Location } from '../../model/mainTripItem';
import { JoinState } from '../../recoil/joinRecoil';
import { MemberState } from '../../recoil/memberRecoil';
import { TextStyles } from '../../styles/CommonStyles';
import { HomeStyles, ViewStyles } from '../../styles/HomeStyles';

const width = Dimensions.get('window').width - 70;

function HomeScreen({ navigation }: any) {
	const [page, setPage] = useState(0);
	const [afterTripList, setAfterTripList] = useState<any[]>([]);
	const [joinState, setJoinState] = useRecoilState(JoinState);
	const memberinfo = useRecoilValue(MemberState);

	useFocusEffect(
		useCallback(() => {
			getTripData();
		}, []),
	);

	useEffect(() => {
		console.log(joinState);
		if (joinState.isAgreed) {
			joinTravel(joinState.travel_id);
		}
	}, []);

	const joinTravel = async (travelId: number) => {
		const data = {
			travel_id: travelId,
		};
		try {
			const res = await api.post(`/group`, data);
			if (res.status === 200) {
				console.log(res.data);
			}
		} catch (err: any) {
			console.error(err.response);
		}
		setJoinState({ isAgreed: false, travel_id: 0 });
	};

	const api = useAxiosWithAuth();

	const getWeather = async (type: string) => {
		const locationRes = await axios.get(
			`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${Config.WEATHER_API_KEY}&q=${Location[type]}`,
		);

		// 현재 상태 얻기
		const curState = await axios.get(
			`http://dataservice.accuweather.com/currentconditions/v1/${locationRes.data[0].Key}?apikey=${Config.WEATHER_API_KEY}`,
		);
		return curState.data[0].WeatherText;
	};

	const getWeatherBackgroundColor = (weather: string) => {
		if (weather.includes('sunny')) return ['#ffffff', '#fceabb'];
		else if (weather.includes('clear')) return ['#ffffff', '#fceabb'];
		else if (weather.includes('rain')) return ['#cfd9df', '#e2ebf0'];
		else if (weather.includes('snow')) return ['#e6e9f0', '#eef1f5'];
		else if (weather.includes('clouds')) return ['#accbee', '#e7f0fd'];
		else if (weather.includes('cloudy')) return ['#fdfbfb', '#ebedee'];
		else if (weather.includes('fog')) return ['#fdfbfb', '#ebedee'];
		else return ['#ffffff', '#ffffff'];
	};

	const getTripData = async () => {
		const res = await api.get(`/travel/info`);
		let newInfo = [];
		if (res.status === 200 && res.data.length > 0) {
			newInfo = await Promise.all(
				res.data.map(async (item: any, index: number) => {
					// const WeatherText = await getWeather(item.travel_type);
					const WeatherText = 'sunny';
					console.log('WeatherText ', WeatherText);
					return {
						...item,
						color: getWeatherBackgroundColor(WeatherText),
						width: width,
						weather: WeatherText.toLowerCase(),
						navigation: navigation,
					};
				}),
			);
		}

		newInfo.push({
			travel_id: -1,
			travel_title: '',
			travel_location: '',
			travel_type: '',
			start_date: '',
			end_date: '',
			remain_date: 0,
			travel_participants: [],
			money: 0,
			color: ['#ffffff', '#ffffff'],
			width: width,
			navigation: navigation,
		});

		console.log('newInfo ', newInfo);
		setAfterTripList(newInfo);
	};

	return (
		// <View style={HomeStyles.container}>
		<LinearGradient colors={['#A7BFE8', '#CFDEF3', '#F2F2F2']} style={HomeStyles.container}>
			<ScrollView style={HomeStyles.scrollView}>
				<View style={ViewStyles({ flexDirection: 'row' }).header}>
					<Text
						style={{
							...TextStyles({ align: 'left', weight: 'bold', color: 'white' }).title,
							// ...TextStyles({ align: 'left', weight: 'bold' }).title,
							flex: 1,
						}}
					>
						TALLY
					</Text>
					<Icon
						name="settings-sharp"
						size={24}
						// color="#91C0EB"
						color="white"
						onPress={() => navigation.navigate('Setting')}
					/>
				</View>
				<View style={ViewStyles().banner}>
					<Text style={TextStyles({ align: 'left' }).small}>
						<Text style={TextStyles({ align: 'left', weight: 'bold' }).regular}>
							{memberinfo.nickname}
						</Text>
						님, 어디로 떠나시나요?
					</Text>
					<Text
						style={{ ...TextStyles({ align: 'left', weight: 'bold' }).header, marginVertical: 15 }}
					>
						톡! 찍으면{'\n'}이체까지 딱!
					</Text>
					<Text style={TextStyles({ align: 'left' }).small}>
						언제 어디서든{'\n'}바로 확인하고 정산하는{'\n'}간편한 여행
					</Text>
				</View>
				<TouchableOpacity style={ViewStyles().bannerButton}>
					<Text
						style={{
							...TextStyles({ align: 'left', color: 'white', weight: 'bold' }).regular,
							textAlignVertical: 'center',
						}}
					>
						MY PASSPORT
					</Text>
					<MaterialIcon
						name="arrow-right-thin"
						size={32}
						style={{ color: 'white', textAlignVertical: 'center' }}
					/>
					<MaterialIcon
						name="passport"
						size={40}
						style={{ color: 'white', flex: 1, textAlign: 'right', textAlignVertical: 'center' }}
					/>
				</TouchableOpacity>
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
				<ProfileBox />
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
			{/* </View> */}
		</LinearGradient>
	);
}

export default HomeScreen;
