import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackProps} from '../../navigation/RootStack';
import {useTheme, Badge} from 'react-native-paper';

type RootStackProp = NativeStackScreenProps<RootStackProps, 'SignIn'>;

function LoginScreen({route}: RootStackProp) {
  const theme = useTheme();
  const {setUserToken} = route.params;

  return (
    <View style={styles.viewContainer}>
      <Text style={{backgroundColor: theme.colors.primary}}>Tally</Text>
      <Button title="Sign Up" onPress={() => setUserToken('token')} />
      <Badge>3</Badge>
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
