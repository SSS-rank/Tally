import React, { useEffect } from 'react';
import { Linking, Text } from 'react-native';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';

import { firebase, FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';

import RootStack from './navigation/RootStack';

const config = {
	screens: {
		Join: { path: 'join//:host/:travelName/:travelId' },
	},
};

const linking = {
	prefixes: ['tally://', 'https://tally.page.link'],
	config,
};

const App = () => {
	useEffect(() => {
		const unsubscribe = firebase.dynamicLinks().onLink((link) => {
			// foregounrd 링크 로직
			console.log(link);
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		firebase
			.dynamicLinks()
			.getInitialLink()
			.then(async (url) => {
				// background & quit 링크 로직
				console.log('background & quit');
				console.log(url);
			});
	}, []);

	return (
		<RecoilRoot>
			<PaperProvider theme={theme}>
				<NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
					{/* <NavigationContainer> */}
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
