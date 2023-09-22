import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdjustScreen from '../screens/AdjustScreen/AdjustScreen';
import GetAdjustScreen from '../screens/AdjustScreen/GetAdjustScreen';
import PaymentScreen from '../screens/AdjustScreen/PaymentScreen';
import SendAdjustScreen from '../screens/AdjustScreen/SendAdjustScreen';
import AnalysisScreen from '../screens/AnalysisScreen/AnalysisScreen';
import PaymentAddScreen from '../screens/PaymentScreen/PaymentAddScreen';
import CreateTripScreen from '../screens/TripScreen/CreateTripScreen';
import TripDetailScreen from '../screens/TripScreen/TripDetatilScreen';
import TripListScreen from '../screens/TripScreen/TripListScreen';

export type TripStackProps = {
	TripList: undefined;
	CreateTrip: undefined;
	TripDetail: undefined;
	AnalysisTrip: undefined;
	AdjustTrip: { tripId: number };
	SendAdjust: undefined | { adjustId?: number };
	GetAdjust: undefined | { adjustId?: number };
	PayAdjust: undefined;
	AddPayment: undefined;
};

const Stack = createNativeStackNavigator<TripStackProps>();

function TripStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShadowVisible: false }} initialRouteName="TripList">
			<Stack.Screen
				name="TripList"
				component={TripListScreen}
				options={{
					title: '여행지 목록',
					headerTitleStyle: {
						fontFamily: 'Pretendard-Light',
					},
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="CreateTrip"
				component={CreateTripScreen}
				options={{ title: '여행지 생성' }}
			/>
			<Stack.Screen
				name="TripDetail"
				component={TripDetailScreen}
				options={{ title: '상세 결제 내역' }}
			/>
			<Stack.Screen name="AnalysisTrip" component={AnalysisScreen} options={{ title: '분석' }} />
			<Stack.Screen name="AdjustTrip" component={AdjustScreen} options={{ title: '' }} />
			<Stack.Screen name="SendAdjust" component={SendAdjustScreen} options={{ title: '' }} />
			<Stack.Screen name="GetAdjust" component={GetAdjustScreen} options={{ title: '' }} />
			<Stack.Screen name="PayAdjust" component={PaymentScreen} options={{ title: '' }} />
			<Stack.Screen name="AddPayment" component={PaymentAddScreen} options={{ title: '' }} />
		</Stack.Navigator>
	);
}

export default TripStack;
