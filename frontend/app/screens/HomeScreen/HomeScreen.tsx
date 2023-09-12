import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.textStyle}>홈이야! 🎉</Text>
      <Text style={styles.textStyle2}>홈이야! 🎉</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 18,
  },
  textStyle2: {
    // fontFamily: 'Pretendard-ExtraBold',
    fontSize: 18,
  },
});

export default HomeScreen;
