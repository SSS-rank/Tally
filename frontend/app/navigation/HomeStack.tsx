import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AddAccountScreen from '../screens/SettingScreen/AddAccountScreen';
import ManageAccountScreen from '../screens/SettingScreen/ManageAccountScreen';
import SettingScreen from '../screens/SettingScreen/SettingScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
	return (
		<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShadowVisible: false }}>
			<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen
				name="Setting"
				component={SettingScreen}
				options={{ title: '설정', headerTitleAlign: 'center' }}
			/>
			<Stack.Screen name="Account" component={ManageAccountScreen} options={{ title: '' }} />
			<Stack.Screen name="AddAccount" component={AddAccountScreen} options={{ title: '' }} />
		</Stack.Navigator>
	);
}

export default HomeStack;
