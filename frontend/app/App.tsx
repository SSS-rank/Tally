import React from 'react';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import StackTrip from './screens/TripScreen/StackTrip';
import TripListScreen from './screens/TripScreen/TripListScreen';

const App = () => {
  return (
    <NavigationContainer>
      {/* <TripListScreen /> */}
      <StackTrip />
      {/* <HomeScreen /> */}
    </NavigationContainer>
  );
};

export default App;
