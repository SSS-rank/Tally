import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AlertScreen from '../screens/AlertScreen/AlertScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AddAccountScreen from '../screens/SettingScreen/AddAccountScreen';
import AuthAccountScreen from '../screens/SettingScreen/AuthAccountScreen';
import ManageAccountScreen from '../screens/SettingScreen/ManageAccountScreen';
import TransferPasswrodConfirmScreen from '../screens/SettingScreen/TransferPasswrodConfirmScreen';
import TransferPasswordScreen from '../screens/SettingScreen/TransferPasswrodScreen';

export type HomeStackProps = {
	Home: undefined;
	Alert: undefined;
	Account: undefined;
	AddAccount: undefined;
	AuthAccount: undefined;
	TransferPassword: undefined;
	TransferPasswordConfirm: undefined;
};

const Stack = createNativeStackNavigator();

function HomeStack() {
	return (
		<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShadowVisible: false }}>
			<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen
				name="Alert"
				component={AlertScreen}
				options={{ title: '알림', headerTitleAlign: 'center' }}
			/>
			<Stack.Screen name="Account" component={ManageAccountScreen} options={{ title: '' }} />
			<Stack.Screen name="AddAccount" component={AddAccountScreen} options={{ title: '' }} />
			<Stack.Screen name="AuthAccount" component={AuthAccountScreen} options={{ title: '' }} />
			<Stack.Screen
				name="TransferPassword"
				component={TransferPasswordScreen}
				options={{ title: '이체 비밀번호 입력' }}
			/>
			<Stack.Screen
				name="TransferPasswordConfirm"
				component={TransferPasswrodConfirmScreen}
				options={{ title: '이체 비밀번호 확인' }}
			/>
		</Stack.Navigator>
	);
}

export default HomeStack;
