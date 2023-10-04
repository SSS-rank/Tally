import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AlertScreen from '../screens/AlertScreen/AlertScreen';
import CheckListScreen from '../screens/CheckListScreen/CheckListScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import StampScreen from '../screens/StampScreen/StampScreen';

export type HomeStackProps = {
	Home: undefined;
	Alert: undefined;
	Stamp: undefined;
	CheckList: { travel_id: number; travel_title: string; start_date: string; end_date: string };
};

const Stack = createNativeStackNavigator();

function HomeStack() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShadowVisible: false,
			}}
		>
			<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen
				name="CheckList"
				component={CheckListScreen}
				options={{ title: '체크리스트' }}
			/>
			<Stack.Screen
				name="Alert"
				component={AlertScreen}
				options={{ title: '알림', headerTitleAlign: 'center' }}
			/>
			<Stack.Screen
				name="Stamp"
				component={StampScreen}
				options={{
					title: 'MY PASSPORT',
					headerTitleAlign: 'center',
				}}
			/>
		</Stack.Navigator>
	);
}

export default HomeStack;
