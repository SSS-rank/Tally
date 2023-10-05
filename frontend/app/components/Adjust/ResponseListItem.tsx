import React, { useState } from 'react';
import {
	FlatList,
	SafeAreaView,
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { TripStackProps } from '../../navigation/TripStack';
import { TextStyles } from '../../styles/CommonStyles';

type ItemData = {
	calculate_group_uuid: string;
	created_time: string;
	amount: number;
	status: string;
	receiver_name?: string;
};
type ItemProps = {
	item: ItemData;
	navigation: NativeStackNavigationProp<TripStackProps, 'AdjustTrip'> | undefined;
};

const Item = ({ item, navigation }: ItemProps) => (
	<TouchableOpacity
		style={{
			flexDirection: 'row',
			backgroundColor: '#F6F6F6',
			alignItems: 'center',
			height: 80,
			marginVertical: 12,
			paddingHorizontal: 10,
		}}
		onPress={() =>
			navigation?.navigate('GetAdjust', {
				adjustId: item.calculate_group_uuid,
				requesterName: item.receiver_name,
				adjustStatus: item.status,
			})
		}
	>
		<Text style={{ ...TextStyles({ align: 'left' }).regular }}>{item.created_time}</Text>
		<View style={{ flex: 1, marginRight: 40 }}>
			<Text
				style={{
					...TextStyles({ align: 'right' }).title,
				}}
			>
				-{item.amount.toLocaleString()}원
			</Text>
			<Text
				style={{
					...TextStyles({ align: 'right', color: '#666666' }).small,
				}}
			>
				요청자 {item.receiver_name}
			</Text>
		</View>
		{item.status === 'REJECT' && (
			<Image
				source={{ uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/payment_reject.png' }}
				style={{
					resizeMode: 'contain',
					width: 100,
					opacity: 0.6,
					position: 'absolute',
					right: 0,
					zIndex: -1,
					height: 100,
				}}
			/>
		)}
		{item.status === 'ONGOING' && (
			<Image
				source={{ uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/payment_ongoing.png' }}
				style={{
					resizeMode: 'contain',
					width: 100,
					opacity: 0.6,
					position: 'absolute',
					right: 0,
					zIndex: -1,
					height: 100,
				}}
			/>
		)}
		{item.status === 'COMPLETE' && (
			<Image
				source={{ uri: 'https://sss-tally.s3.ap-northeast-2.amazonaws.com/payment_complete.png' }}
				style={{
					resizeMode: 'contain',
					width: 100,
					opacity: 0.6,
					position: 'absolute',
					right: 0,
					zIndex: -1,
					height: 100,
				}}
			/>
		)}
	</TouchableOpacity>
);

const ResponseListItem = ({
	data,
	navigation,
	route,
}: {
	data: any[];
	navigation?: NativeStackNavigationProp<TripStackProps, 'AdjustTrip'>;
	route?: RouteProp<TripStackProps, 'SendAdjust'>;
}) => {
	const [selectedId, setSelectedId] = useState<string>();

	const renderItem = ({ item }: { item: ItemData }) => {
		return <Item item={item} navigation={navigation} />;
	};

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.calculate_group_uuid}
				extraData={selectedId}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		// fontSize: 32,
	},
});

export default ResponseListItem;
