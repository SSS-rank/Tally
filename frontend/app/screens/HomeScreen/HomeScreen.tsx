import React, { useCallback, useState } from 'react';
import { Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Button } from 'react-native-paper';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Carousel from '../../components/Carousel';
import TravelSheet from '../../components/HomeScreen/TravelSheet';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { TextStyles } from '../../styles/CommonStyles';
import { HomeStyles, ViewStyles } from '../../styles/HomeStyles';

const width = Dimensions.get('window').width - 70;

const TravelSheetPage = ({
	item,
}: {
	item: {
		id: number;
		color: string;
		dday: number;
		title: string;
		startDate: string;
		endDate: string;
		balance: number;
		profile1: string;
		profile2: string;
		profile3: string;
	};
}) => {
	return (
		<TouchableOpacity
			style={{
				...ViewStyles({ height: 300, color: item.color }).box,
				width: width,
				marginHorizontal: 0,
				elevation: 2,
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					width: '100%',
				}}
			>
				<View style={{ alignItems: 'flex-start', flex: 1 }}>
					<Text style={TextStyles({ weight: 'bold', mBottom: 5 }).title}>🇩🇪 D - {item.dday}</Text>
					<Text style={TextStyles().title}>{item.title}</Text>
					<Text style={TextStyles({ mBottom: 5 }).small}>
						{item.startDate} ~ {item.endDate}
					</Text>
					<Text style={TextStyles().header}>{item.balance}원</Text>
				</View>
			</View>
			<View style={{ alignItems: 'flex-start', backgroundColor: 'red' }}></View>
			<View style={ViewStyles().boxMate}>
				<Avatar.Image
					style={ViewStyles({ left: 0 }).avatarMate}
					size={32}
					source={require('../../assets/images/kakao.png')}
				/>
				<Avatar.Image
					style={ViewStyles({ left: 16 }).avatarMate}
					size={32}
					source={require('../../assets/images/kakao.png')}
				/>
				<Avatar.Image
					style={ViewStyles({ left: 32 }).avatarMate}
					size={32}
					source={require('../../assets/images/kakao.png')}
				/>
			</View>
			<View
				style={{
					justifyContent: 'flex-end',
					flex: 1,
					// backgroundColor: 'red',
				}}
			>
				<Button
					icon="check"
					mode="text"
					// buttonColor="#000000"
					onPress={() => console.log('Pressed')}
				>
					체크리스트
				</Button>
			</View>
		</TouchableOpacity>
	);
};

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

		const newInfo = res.data.map((item: any) => ({
			...item,
			travelParticipants: item.travelParticipants.map((member: any) => ({
				member_uuid: member.member_uuid,
				nickname: member.member_nickname,
				profile_image: member.image,
			})),
			color: '#ffffff',
			width: width,
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
				<View style={ViewStyles({ flexDirection: 'row', alignItems: 'center' }).box}>
					<View style={ViewStyles({ alignItems: 'center' }).innerProfile}>
						<Avatar.Image
							style={{ backgroundColor: 'transparent' }}
							size={54}
							source={require('../../assets/images/kakao.png')}
						/>
						<Text style={TextStyles().regular}>김싸피</Text>
					</View>
					<View style={ViewStyles({ alignItems: 'center' }).innerProfile}>
						<Text style={TextStyles().title}>2</Text>
						<Text style={TextStyles().regular}>국내</Text>
					</View>
					<View style={ViewStyles({ alignItems: 'center' }).innerProfile}>
						<Text style={TextStyles().title}>2</Text>
						<Text style={TextStyles().regular}>해외</Text>
					</View>
				</View>
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
