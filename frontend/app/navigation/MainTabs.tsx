import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from './HomeStack';
import SettingStack from './SettingStack';
import TripStack from './TripStack';
export type MainTabsProps = {
	HomeStack: undefined;
	TripStack: undefined;
	Setting: undefined;
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
				name="Setting"
				component={SettingStack}
				options={{
					title: '설정',
					tabBarLabel: 'Setting',
					headerTitleAlign: 'center',
					tabBarIcon: ({ color }: any) => <Icon name="settings-sharp" size={24} color={color} />,
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
}
export default MainTabs;
