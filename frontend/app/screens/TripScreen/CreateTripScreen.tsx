import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function CreateTripScreen() {
  return (
    <View style={styles.viewContainer}>
      <Text>Create Screen! 🎉</Text>
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

export default CreateTripScreen;
