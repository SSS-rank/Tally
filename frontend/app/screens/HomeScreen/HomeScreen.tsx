import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.viewContainer}>
      <Text>HomeScreen! 🎉</Text>
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

export default HomeScreen;
