import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Button, Text } from 'react-native-paper';

import RainAnimation from './RainAnimation';
import SnowAnimation from './SnowAnimation';
import SunnyAnimation from './SunnyAnimation';
import { TravelSheetItem } from '../../model/mainTripItem';
import { TextStyles } from '../../styles/CommonStyles';
import { ViewStyles } from '../../styles/HomeStyles';

interface TravelSheetProps extends TravelSheetItem {
	width: number;
	color: string[];
	weather: string;
}

function TravelSheet({ item }: { item: TravelSheetProps }) {
	return (
		<TouchableOpacity
			style={{
				...ViewStyles({ height: 300 }).box,
				width: item.width,
				marginHorizontal: 0,
				elevation: 2,
			}}
		>
			<LinearGradient colors={item.color} style={styles.linerContainer} />
			{item.weather?.includes('Snow') && <SnowAnimation />}
			{item.weather?.includes('Rain') && <RainAnimation />}
			{item.weather?.includes('Sunny') && <SunnyAnimation />}

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
								uri: `https://sss-tally.s3.ap-northeast-2.amazonaws.com/${item.travelLocation}.png`,
							}}
						/>
						<Text style={TextStyles({ weight: 'bold', mLeft: 10 }).title}>
							D - {item.remainDate}
						</Text>
					</View>
					<View style={styles.titleView}>
						<Text style={TextStyles({ weight: 'bold' }).title}>{item.travelTitle}</Text>
						<Text style={TextStyles({ mLeft: 5 }).small}>{item.travelType}</Text>
					</View>
					<Text style={TextStyles({ mBottom: 5 }).small}>
						{item.startDate} ~ {item.endDate}
					</Text>
					<Text style={TextStyles({ weight: 'bold' }).header}>{item.money}원</Text>
				</View>
			</View>
			<View style={{ alignItems: 'flex-start', backgroundColor: 'red' }}></View>
			<View style={ViewStyles().boxMate}>
				{item.travelParticipants.map((member) => (
					<Avatar.Image
						key={member.member_uuid}
						style={ViewStyles({ left: 0 }).avatarMate}
						size={40}
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
