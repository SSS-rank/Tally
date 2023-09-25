import React, { useState } from 'react';
import { FlatList, SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { TripStackProps } from '../../navigation/TripStack';
import { TextStyles } from '../../styles/CommonStyles';

type TripDetailScreenProps = {
	navigation?: NativeStackNavigationProp<TripStackProps, 'AdjustTrip'>;
	route?: RouteProp<TripStackProps, 'GetAdjust'>;
};

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
			marginTop: 20,
			paddingHorizontal: 10,
		}}
		onPress={() => navigation?.navigate('GetAdjust')}
	>
		<Text style={{ ...TextStyles({ align: 'left' }).regular }}>{item.created_time}</Text>
		<View style={{ flex: 1 }}>
			<Text
				style={{
					...TextStyles({ align: 'right' }).title,
				}}
			>
				-{item.amount}원
			</Text>
			<Text
				style={{
					...TextStyles({ align: 'right', color: '666666' }).small,
				}}
			>
				요청자 {item.receiver_name}
			</Text>
		</View>
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
