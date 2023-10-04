import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddAccountScreen from '../screens/SettingScreen/AddAccountScreen';
import AuthAccountScreen from '../screens/SettingScreen/AuthAccountScreen';
import ManageAccountScreen from '../screens/SettingScreen/ManageAccountScreen';
import SettingScreen from '../screens/SettingScreen/SettingScreen';
import TransferPasswrodConfirmScreen from '../screens/SettingScreen/TransferPasswrodConfirmScreen';
import TransferPasswordScreen from '../screens/SettingScreen/TransferPasswrodScreen';

const Stack = createNativeStackNavigator();

export type SettingStackProps = {
	Setting: undefined;
	Account: undefined;
	AddAccount: undefined;
	AuthAccount: undefined;
	TransferPassword: undefined;
	TransferPasswordConfirm: undefined;
};

function SettingStack() {
	return (
		<Stack.Navigator initialRouteName="Setting" screenOptions={{ headerShadowVisible: false }}>
			<Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
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

export default SettingStack;
