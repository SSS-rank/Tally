import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TripStack from './TripStack';
import AlertScreen from '../screens/AlertScreen/AlertScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

export type MainTabsProps = {
  Home: undefined;
  TripStack: undefined;
  Alert: undefined;
};

const Tab = createBottomTabNavigator<MainTabsProps>();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}: any) => (
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
          tabBarIcon: ({color}: any) => (
            <MaterialCommunityIcons
              name="wallet-travel"
              color={color}
              size={26}
            />
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
          tabBarIcon: ({color}: any) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MainTabs;
