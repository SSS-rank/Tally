import React from 'react';
import {Text, View, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen/HomeScreen';
import LoginScreen from '../LoginScreen/LoginScreen';

const Tab = createBottomTabNavigator();

const TripListScreen = ({navigation}: any) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Trip Screen! 🎉</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Create')}
        />
      </View>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    </>
  );
};

export default TripListScreen;
