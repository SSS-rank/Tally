import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function AlertScreen() {
  return (
    <View style={styles.viewContainer}>
      <Text>AlertScreen! 🎉</Text>
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

export default AlertScreen;
