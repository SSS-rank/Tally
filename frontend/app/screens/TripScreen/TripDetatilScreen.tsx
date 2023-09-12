import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TripStackProps} from '../../navigation/TripStack';

type TripStackProp = NativeStackScreenProps<TripStackProps, 'TripDetail'>;

function TripDetailScreen({navigation}: TripStackProp) {
  return (
    <View style={styles.viewContainer}>
      <Text>TripDetailScreen! 🎉</Text>
      <Button
        title="분석"
        onPress={() => navigation.navigate('AnalysisTrip')}
      />
      <Button title="정산" onPress={() => navigation.navigate('AdjustTrip')} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TripDetailScreen;
