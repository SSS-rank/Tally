import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type JoinScreenProps = BottomTabScreenProps<RootStackProps, 'Join'>;
import { RootStackProps } from '../../navigation/RootStack';

function JoinScreen({ navigation, route }: JoinScreenProps) {
	const { travelId } = route.params;
	return (
		<View style={styles.viewContainer}>
			<Text>초대</Text>
			<Text>{travelId}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default JoinScreen;
