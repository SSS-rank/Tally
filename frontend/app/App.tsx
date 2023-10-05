import React, { useEffect } from 'react';
import { Linking, Text, AppState, AppStateStatus } from 'react-native';
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
	prefixes: ['tally://', 'https://tally.com/'],
	config,
};
const App = () => {
	// useEffect(() => {
	// 	const unsubscribe = firebase.dynamicLinks().onLink((link) => {
	// 		// foregounrd 링크 로직
	// 		console.log(link);
	// 	});
	// 	return () => unsubscribe();
	// }, []);
	// // useEffect(() => {
	// // 	firebase
	// // 		.dynamicLinks()
	// // 		.getInitialLink()
	// // 		.then((link) => {
	// // 			console.log(link);
	// // 			//   if (link.url === 'https://invertase.io/offer') {
	// // 			// 	// ...set initial route as offers screen
	// // 			//   }
	// // 		});
	// // }, []);
	// useEffect(() => {
	// 	// You can also listen for changes in the app state (background/foreground)
	// 	console.log(AppState.currentState);
	// 	const onAppStateChange = (nextAppState: AppStateStatus) => {
	// 		if (nextAppState === 'active') {
	// 			// Check for any pending dynamic links when the app becomes active
	// 			firebase
	// 				.dynamicLinks()
	// 				.getInitialLink()
	// 				.then((link) => {
	// 					if (link) {
	// 						// Handle the initial dynamic link if there's one
	// 						console.log('Received Initial Dynamic Link:', link);
	// 					}
	// 				});
	// 		}
	// 	};
	// 	console.log(AppState.currentState);
	// 	// Subscribe to app state changes
	// 	const appStateSubscription = AppState.addEventListener('change', onAppStateChange);

	// 	return () => {
	// 		// Remove the app state change listener
	// 		appStateSubscription.remove();
	// 	};
	// }, []);
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
