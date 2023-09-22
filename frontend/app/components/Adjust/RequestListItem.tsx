import React, { useState } from 'react';
import {
	FlatList,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { TripStackProps } from '../../navigation/TripStack';
import { TextStyles } from '../../styles/CommonStyles';

// type TripDetailScreenProps = NativeStackScreenProps<TripStackProps, 'AdjustTrip'>;

type TripDetailScreenProps = {
	navigation?: NativeStackNavigationProp<TripStackProps, 'AdjustTrip'>;
	route?: RouteProp<TripStackProps, 'SendAdjust'>;
};

type ItemData = {
	calculate_group_uuid: string;
	created_time: string;
	amount: number;
	status: string;
	receiver_name?: string;
};

const DATA: ItemData[] = [
	{
		calculate_group_uuid: '1',
		created_time: '09-23',
		amount: 13000,
		status: '진행중',
	},
	{
		calculate_group_uuid: '2',
		created_time: '09-23',
		amount: 15000,
		status: '진행중',
	},
	{
		calculate_group_uuid: '3',
		created_time: '09-23',
		amount: 17000,
		status: '진행중',
	},
];

type ItemProps = {
	item: ItemData;
	navigation: NativeStackNavigationProp<TripStackProps, 'AdjustTrip'> | undefined;
};

const Item = ({ item, navigation }: ItemProps) => (
	// <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
	// 	<Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
	// </TouchableOpacity>
	<TouchableOpacity
		style={{
			flexDirection: 'row',
			backgroundColor: '#F6F6F6',
			alignItems: 'center',
			height: 80,
			marginTop: 20,
			paddingHorizontal: 10,
		}}
		onPress={() => {
			console.log(navigation);
			navigation?.navigate('SendAdjust');
		}}
	>
		<Text style={TextStyles().regular}>{item.created_time}</Text>
		<Text
			style={{
				...TextStyles({ align: 'right' }).title,
				flex: 1,
				lineHeight: 60,
			}}
		>
			{item.amount}원
		</Text>
	</TouchableOpacity>
);

const RequestListItem = ({
	test,
	navigation,
	route,
}: {
	test: any[];
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
				data={test}
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

export default RequestListItem;
