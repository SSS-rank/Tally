import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Button, Text } from 'react-native-paper';

import { TextStyles } from './../../styles/CommonStyles';
import CloudAnimation from './CloudAnimation';
import RainAnimation from './RainAnimation';
import SnowAnimation from './SnowAnimation';
import SunnyAnimation from './SunnyAnimation';
import TripAddCarouselItem from './TripAddCarouselItem';
import { TravelSheetItem } from '../../model/mainTripItem';
import { ViewStyles } from '../../styles/HomeStyles';

interface TravelSheetProps extends TravelSheetItem {
	width: number;
	color: string[];
	weather: string;
	travel_id: number;
}

function TravelSheet({ item }: { item: TravelSheetProps }) {
	return (
		<>
			{item.travel_id !== -1 && (
				<TouchableOpacity
					style={{
						...ViewStyles({ height: 300 }).box,
						width: item.width,
						marginHorizontal: 0,
						elevation: 2,
					}}
					onPress={() =>
						item.navigation.navigate('TripStack', {
							screen: 'TripDetail',
							params: { travel_id: item.travel_id },
						})
					}
				>
					<LinearGradient colors={item.color} style={styles.linerContainer} />
					{item.weather?.includes('snow') && <SnowAnimation />}
					{item.weather?.includes('rain') && <RainAnimation />}
					{item.weather?.includes('sunny') && <SunnyAnimation />}
					{item.weather?.includes('clear') && <SunnyAnimation />}
					{item.weather?.includes('clouds') && <CloudAnimation type="" />}
					{item.weather?.includes('cloudy') && <CloudAnimation type="cloudy" />}
					{item.weather?.includes('fog') && <CloudAnimation type="cloudy" />}

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<View style={{ alignItems: 'flex-start', flex: 1 }}>
							<View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
								<Avatar.Image
									size={32}
									source={{
										uri: `https://sss-tally.s3.ap-northeast-2.amazonaws.com/${item.travel_location}.png`,
									}}
								/>
								<Text style={TextStyles({ weight: 'bold', mLeft: 10 }).title}>
									D - {item.remain_date}
								</Text>
							</View>
							<View style={styles.titleView}>
								<Text style={TextStyles({ weight: 'bold' }).title}>{item.travel_title}</Text>
								<Text style={TextStyles({ mLeft: 5 }).small}>{item.travel_type}</Text>
							</View>
							<Text style={TextStyles({ mBottom: 5 }).small}>
								{item.start_date} ~ {item.end_date}
							</Text>
							<Text style={TextStyles({ weight: 'bold' }).header}>{item.money}원</Text>
						</View>
					</View>
					<View style={{ alignItems: 'flex-start', backgroundColor: 'red' }}></View>
					<View style={ViewStyles().boxMate}>
						{item.travel_participants.map((member) => (
							<Avatar.Image
								key={member.member_uuid}
								style={ViewStyles({ left: 0 }).avatarMate}
								size={32}
								source={{ uri: member.profile_image }}
							/>
						))}
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
			)}
			{item.travel_id === -1 && (
				<TripAddCarouselItem
					containerStyle={{
						...ViewStyles({ height: 300 }).box,
						width: item.width,
						marginHorizontal: 0,
						elevation: 2,
					}}
					navigation={item.navigation}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	linerContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		borderRadius: 10,
	},
	titleView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
	},
});

export default TravelSheet;
