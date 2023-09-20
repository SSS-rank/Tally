import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from './HomeStack';
import TripStack from './TripStack';
import AlertScreen from '../screens/AlertScreen/AlertScreen';

export type MainTabsProps = {
	HomeStack: undefined;
	TripStack: undefined;
	Alert: undefined;
};

const Tab = createBottomTabNavigator<MainTabsProps>();

function MainTabs() {
	return (
		<Tab.Navigator
			initialRouteName="HomeStack"
			screenOptions={{ tabBarActiveTintColor: '#91C0EB', tabBarShowLabel: false }}
		>
			<Tab.Screen
				name="HomeStack"
				component={HomeStack}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color }: any) => (
						<MaterialCommunityIcons name="home" color={color} size={26} />
					),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="TripStack"
				component={TripStack}
				options={{
					title: '여행지',
					tabBarLabel: 'Trip',
					tabBarIcon: ({ color }: any) => (
						<MaterialCommunityIcons name="wallet-travel" color={color} size={26} />
					),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Alert"
				component={AlertScreen}
				options={{
					title: '알림',
					tabBarLabel: 'Alert',
					tabBarIcon: ({ color }: any) => (
						<MaterialCommunityIcons name="bell" color={color} size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
export default MainTabs;
