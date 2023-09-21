import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaymentAddScreen from '../screens/PaymentScreen/PaymentAddScreen';
import TripDetailScreen from '../screens/TripScreen/TripDetatilScreen';

export type PaymentStackProps = {
	TripDetail: undefined;
	AddPayment: undefined;
};

const Stack = createNativeStackNavigator<PaymentStackProps>();

function PaymentStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShadowVisible: false }} initialRouteName="TripDetail">
			<Stack.Screen
				name="TripDetail"
				component={TripDetailScreen}
				options={{ title: '상세 결제 내역' }}
			/>

			<Stack.Screen
				name="AddPayment"
				component={PaymentAddScreen}
				options={{ title: '거래내역 추가' }}
			/>
		</Stack.Navigator>
	);
}

export default PaymentStack;
