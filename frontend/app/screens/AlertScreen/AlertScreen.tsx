import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type TripStackProp = BottomTabScreenProps<MainTabsProps, 'TripStack'>;
import { MainTabsProps } from '../../navigation/MainTabs';
import { TripStackProps } from '../../navigation/TripStack';

function AlertScreen({ navigation }: any) {
	return (
		<View style={styles.viewContainer}>
			<Button
				mode="text"
				onPress={() => navigation.navigate('TripStack', { screen: 'AdjustTrip' })}
			>
				정산 현황
			</Button>
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

export default AlertScreen;
