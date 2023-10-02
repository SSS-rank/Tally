import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Dimensions, ScrollView, Alert } from 'react-native';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';

import messaging from '@react-native-firebase/messaging';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRecoilState } from 'recoil';

import Carousel from '../../components/Carousel';
import MainBanner from '../../components/HomeScreen/MainBanner';
import MainHeader from '../../components/HomeScreen/MainHeader';
import PassportButton from '../../components/HomeScreen/PassportButton';
import ProfileBox from '../../components/HomeScreen/ProfileBox';
import TravelSheet from '../../components/HomeScreen/TravelSheet';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { Location } from '../../model/mainTripItem';
import { JoinState } from '../../recoil/joinRecoil';
import { TextStyles } from '../../styles/CommonStyles';
import { HomeStyles, ViewStyles } from '../../styles/HomeStyles';

const width = Dimensions.get('window').width - 70;

function HomeScreen({ navigation }: any) {
	const [page, setPage] = useState(0);
	const [afterTripList, setAfterTripList] = useState<any[]>([]);
	const [joinState, setJoinState] = useRecoilState(JoinState);

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
		if (weather.includes('sunny')) return ['#ffffff', '#fffbe6'];
		else if (weather.includes('clear')) return ['#ffffff', '#fffbe6'];
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
					// console.log('WeatherText ', WeatherText);
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
		// console.log('newInfo ', newInfo);
		setAfterTripList(newInfo);
	};

	// 포그라운드일 때 알림 받기
	useEffect(() => {
		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			console.log('remoteMessage', JSON.stringify(remoteMessage));
			Alert.alert(String(remoteMessage.notification?.title), remoteMessage.notification?.body, [
				{ text: '나중에 확인할게요' },
				{
					text: '확인',
					onPress: () => navigation.navigate('Alert'),
				},
			]);
		});
		return unsubscribe;
	}, []);

	return (
		<LinearGradient colors={['#A7BFE8', '#CFDEF3', '#F2F2F2']} style={HomeStyles.container}>
			<ScrollView style={HomeStyles.scrollView}>
				<MainHeader navigation={navigation} />
				<MainBanner />
				<PassportButton />
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
		</LinearGradient>
	);
}

export default HomeScreen;
