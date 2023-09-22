import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './MainTabs';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';

export type RootStackProps = {
	MainTabs: undefined;
	SignIn: { setUserToken: any };
};

const Stack = createNativeStackNavigator<RootStackProps>();

function RootStack() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [userToken, setUserToken] = React.useState(null);

	const getUserToken = async () => {
		// testing purposes
		const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));
		try {
			// custom logic
			await sleep(2000);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		getUserToken();
	}, []);

	if (isLoading) {
		// We haven't finished checking for the token yet
		return <SplashScreen />;
	}
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{userToken === null ? (
				// No token found, user isn't signed in
				<Stack.Screen name="SignIn" component={LoginScreen} initialParams={{ setUserToken }} />
			) : (
				// User is signed in
				<Stack.Screen name="MainTabs" component={MainTabs} />
			)}
		</Stack.Navigator>
	);
}
export default RootStack;
