import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackProps} from '../../navigation/RootStack';

type RootStackProp = NativeStackScreenProps<RootStackProps, 'SignIn'>;

function LoginScreen({route}: RootStackProp) {
  const {setUserToken} = route.params;

  return (
    <View style={styles.viewContainer}>
      <Text>Tally</Text>
      <Button title="Sign Up" onPress={() => setUserToken('token')} />
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

export default LoginScreen;
