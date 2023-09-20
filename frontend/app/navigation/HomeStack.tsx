import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TripStack from './TripStack';
import AlertScreen from '../screens/AlertScreen/AlertScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SettingScreen from '../screens/SettingScreen/SettingScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Setting" component={SettingScreen} options={{ title: '' }} />
		</Stack.Navigator>
	);
}

export default HomeStack;
