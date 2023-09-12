import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function AdjustListScreen() {
  return (
    <View style={styles.viewContainer}>
      <Text>AdjustScreen! 🎉</Text>
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

export default AdjustListScreen;
