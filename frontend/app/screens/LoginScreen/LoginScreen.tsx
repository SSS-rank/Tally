import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackProps} from '../../navigation/RootStack';
import {Button} from 'react-native-paper';

type RootStackProp = NativeStackScreenProps<RootStackProps, 'SignIn'>;

function LoginScreen({route}: RootStackProp) {
  const {setUserToken} = route.params;

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.titleText}>Tally</Text>
      <Button
        mode="contained"
        buttonColor="#FFE900"
        textColor="#232323"
        onPress={() => setUserToken('token')}
        style={{borderRadius: 24, padding: 4}}>
        <Image source={require('../../assets/images/kakao.png')} />
        카카오톡으로 시작하기
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {fontSize: 50, fontWeight: 'bold', marginBottom: 40},
});

export default LoginScreen;
