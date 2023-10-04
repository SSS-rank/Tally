import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRecoilValue } from 'recoil';

import MainTabs from './MainTabs';
import { TokenState } from '../recoil/recoil';
import JoinScreen from '../screens/JoinScreen/JoinScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';

export type RootStackProps = {
	MainTabs: undefined;
	SignIn: { setUserToken: any } | undefined;
	Join: { host: string; travelName: string; travelId: number };
};

const Stack = createNativeStackNavigator<RootStackProps>();

function RootStack() {
	const [isLoading, setIsLoading] = React.useState(true);
	const tokenState = useRecoilValue(TokenState);

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
			{tokenState.accessToken === '' ? (
				// No token found, user isn't signed in
				<Stack.Screen name="SignIn" component={LoginScreen} />
			) : (
				// User is signed in
				<Stack.Screen name="MainTabs" component={MainTabs} />
			)}
			<Stack.Screen name="Join" component={JoinScreen} />
		</Stack.Navigator>
	);
}
export default RootStack;
