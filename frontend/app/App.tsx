import React, { useEffect } from 'react';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';

import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot, useRecoilValue } from 'recoil';

import RootStack from './navigation/RootStack';

// 백그라운드일 때 알림 받기
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
	console.log('Message handled in the background!', remoteMessage);
});

const App = () => {
	// 포그라운드일 때 알림 받기
	useEffect(() => {
		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			console.log('remoteMessage', JSON.stringify(remoteMessage));
		});
		return unsubscribe;
	}, []);

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
