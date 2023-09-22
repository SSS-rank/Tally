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
	id: string;
	title: string;
	createDate: string;
	totalAmount: number;
};

const DATA: ItemData[] = [
	{
		id: '1',
		title: 'First Item',
		createDate: '09-23',
		totalAmount: 10000,
	},
	{
		id: '2',
		title: 'Second Item',
		createDate: '09-23',
		totalAmount: 10000,
	},
	{
		id: '3',
		title: 'Third Item',
		createDate: '09-23',
		totalAmount: 10000,
	},
];

type ItemProps = {
	item: ItemData;
	onPress: () => void;
	backgroundColor: string;
	textColor: string;
	navigation: NativeStackNavigationProp<TripStackProps, 'AdjustTrip'> | undefined;
};

const Item = ({ item, onPress, backgroundColor, textColor, navigation }: ItemProps) => (
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
		<Text style={TextStyles().regular}>23.09.01</Text>
		<Text
			style={{
				...TextStyles({ align: 'right' }).title,
				flex: 1,
				lineHeight: 60,
			}}
		>
			200,000원
		</Text>
	</TouchableOpacity>
);

const RequestListItem = ({ navigation }: TripDetailScreenProps) => {
	const [selectedId, setSelectedId] = useState<string>();

	const renderItem = ({ item }: { item: ItemData }) => {
		const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
		const color = item.id === selectedId ? 'white' : 'black';
		console.log(navigation);
		// item.navigation = navigation?.navigate('SendAdjust');

		return (
			<Item
				item={item}
				onPress={() => setSelectedId(item.id)}
				backgroundColor={backgroundColor}
				textColor={color}
				navigation={navigation}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				extraData={selectedId}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});

export default RequestListItem;
