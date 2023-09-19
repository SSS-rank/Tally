import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdjustScreen from '../screens/AdjustScreen/AdjustScreen';
import AnalysisScreen from '../screens/AnalysisScreen/AnalysisScreen';
import CreateTripScreen from '../screens/TripScreen/CreateTripScreen';
import TripDetailScreen from '../screens/TripScreen/TripDetatilScreen';
import TripListScreen from '../screens/TripScreen/TripListScreen';

export type TripStackProps = {
	TripList: undefined;
	CreateTrip: undefined;
	TripDetail: undefined;
	AnalysisTrip: undefined;
	AdjustTrip: undefined;
};

const Stack = createNativeStackNavigator<TripStackProps>();

function TripStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
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
		</Stack.Navigator>
	);
}

export default TripStack;
