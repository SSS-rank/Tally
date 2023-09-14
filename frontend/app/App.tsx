import React from 'react';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';

import RootStack from './navigation/RootStack';

const App = () => {
  return (
    <RecoilRoot>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PaperProvider>
    </RecoilRoot>
  );
};

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
};

export default App;
