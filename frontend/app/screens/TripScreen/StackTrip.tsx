import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TripListScreen from './TripListScreen';
import CreateTripScreen from './CreateTripScreen';

const Stack = createNativeStackNavigator();

function StackTrip() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TripListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Create" component={CreateTripScreen} />
    </Stack.Navigator>
  );
}

export default StackTrip;
