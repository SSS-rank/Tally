import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {TripStackProps} from '../../navigation/TripStack';

type TripStackProp = NativeStackScreenProps<TripStackProps, 'TripList'>;

function TripListScreen({navigation}: TripStackProp) {
  return (
    <>
      <View style={styles.viewContainer}>
        <Text>Trip Screen! 🎉</Text>
        <Button
          title="여행 추가"
          onPress={() => navigation.navigate('CreateTrip')}
        />
        <Button
          title="상세"
          onPress={() => navigation.navigate('TripDetail')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TripListScreen;
