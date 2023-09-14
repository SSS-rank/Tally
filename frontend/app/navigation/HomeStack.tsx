import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TripStack from './TripStack';
import AlertScreen from '../screens/AlertScreen/AlertScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TripStack" component={TripStack} />
      <Stack.Screen name="Alert" component={AlertScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
