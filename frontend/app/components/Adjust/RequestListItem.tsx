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
			marginTop: 20,
			paddingHorizontal: 10,
		}}
		onPress={() => {
			console.log(navigation);
			navigation?.navigate('SendAdjust', { adjustId: item.calculate_group_uuid });
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
});

export default RequestListItem;
