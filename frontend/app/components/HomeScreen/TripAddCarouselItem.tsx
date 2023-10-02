import React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { TextStyles } from '../../styles/CommonStyles';

interface TripAddCarouselItemProp {
	containerStyle: StyleProp<ViewStyle>;
	navigation: any;
}

function TripAddCarouselItem({ containerStyle, navigation }: TripAddCarouselItemProp) {
	return (
		<TouchableOpacity
			style={containerStyle}
			onPress={() => navigation.navigate('TripStack', { screen: 'CreateTrip' })}
		>
			<View style={styles.view}>
				<MaterialIcon name="plus-circle" size={54} style={{ color: '#91C0EB', marginBottom: 20 }} />
				<View>
					<Text style={TextStyles({ weight: 'bold' }).regular}>여행 만들기</Text>
					<Text style={TextStyles({ color: '#666666', mTop: 5 }).small}>
						여행을 등록하고 떠나보세요
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	view: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		width: '100%',
	},
});

export default TripAddCarouselItem;
