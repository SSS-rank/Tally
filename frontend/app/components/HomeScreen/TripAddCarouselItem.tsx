import React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { TextStyles } from '../../styles/CommonStyles';

interface TripAddCarouselItemProp {
	containerStyle: StyleProp<ViewStyle>;
}

function TripAddCarouselItem({ containerStyle }: TripAddCarouselItemProp) {
	return (
		<TouchableOpacity style={containerStyle}>
			<View style={styles.view}>
				<MaterialIcon name="plus-circle" size={48} style={{ color: '#91C0EB', marginRight: 10 }} />
				<View>
					<Text style={TextStyles({ align: 'left' }).medium}>여행 만들기</Text>
					<Text style={TextStyles({ align: 'left', color: '#666666' }).small}>
						여행을 등록하고 떠나보세요
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	view: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default TripAddCarouselItem;
