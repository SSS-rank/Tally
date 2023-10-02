import React, { useEffect } from 'react';
import { Linking, Text } from 'react-native';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';

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
	prefixes: ['tally://'],
	config,
};

const App = () => {
	// useEffect(() => {
	// 	const handleDeepLink = async () => {
	// 		const url = await Linking.getInitialURL();
	// 		console.log(url);
	// 		if (url) {
	// 			console.log(url);
	// 			// URL 처리 로직을 작성합니다.
	// 			// 예: 특정 화면으로 네비게이션, 데이터 불러오기 등
	// 		}
	// 	};
	// 	handleDeepLink();
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
