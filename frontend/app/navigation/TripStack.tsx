import React from 'react';
import { IconButton } from 'react-native-paper';

import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';

import { TripMember } from '../model/trip';
import AdjustScreen from '../screens/AdjustScreen/AdjustScreen';
import GetAdjustScreen from '../screens/AdjustScreen/GetAdjustScreen';
import PaymentPasswordScreen from '../screens/AdjustScreen/PaymentPasswordScreen';
import PaymentScreen from '../screens/AdjustScreen/PaymentScreen';
import SendAdjustScreen from '../screens/AdjustScreen/SendAdjustScreen';
import AnalysisCategoryScreen from '../screens/AnalysisScreen/AnalysisCategoryScreen';
import AnalysisPersonalScreen from '../screens/AnalysisScreen/AnalysisPersonalScreen';
import AnalysisScreen from '../screens/AnalysisScreen/AnalysisScreen';
import PaymentAddScreen from '../screens/PaymentScreen/PaymentAddScreen';
import PaymentModifyScreen from '../screens/PaymentScreen/PaymentModifyScreen';
import CreateTripScreen from '../screens/TripScreen/CreateTripScreen';
import TripDetailScreen from '../screens/TripScreen/TripDetatilScreen';
import TripListScreen from '../screens/TripScreen/TripListScreen';

export type TripStackProps = {
	TripList: undefined;
	CreateTrip: undefined;
	TripDetail: { travel_id: number };
	AnalysisTrip: undefined;
	AnalysisPersonal: { member_uuid: string };
	AnalysisCategory: { category_id: number; title: string; member_uuid: string; money: number };
	AdjustTrip: { tripId: number };
	SendAdjust: { adjustId: string };
	GetAdjust: { adjustId: string; requesterName?: string };
	PayAdjust: { adjustId: string };
	AddPayment: {
		travel_id: number;
		travel_title: string;
		participants: TripMember[];
	};
	ModifyPayment: {
		payment_uuid: string; // 결제 uuid(String)
		payer: string; // 결제자의 uuid(String)
		method: string;
	};
	Password: { adjustId: string; accountNumber: string };
};

const Stack = createNativeStackNavigator<TripStackProps>();
type TripDetailScreenProps = NativeStackScreenProps<TripStackProps>;

function TripStack({ navigation }: TripDetailScreenProps) {
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
				options={{
					title: '여행지 생성',
					headerLeft: () => (
						<IconButton
							icon="close"
							iconColor="#232323"
							size={24}
							style={{
								position: 'relative',
								left: -15,
								top: 2,
							}}
							onPress={() => navigation.navigate('TripList')}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="TripDetail"
				component={TripDetailScreen}
				options={{
					title: '상세 결제 내역',
					headerLeft: () => (
						<IconButton
							icon="arrow-left"
							iconColor="#232323"
							size={24}
							style={{
								position: 'relative',
								left: -15,
								top: 2,
							}}
							onPress={() => navigation.navigate('TripList')}
						/>
					),
				}}
			/>
			<Stack.Screen name="AnalysisTrip" component={AnalysisScreen} options={{ title: '분석' }} />
			<Stack.Screen
				name="AnalysisCategory"
				component={AnalysisCategoryScreen}
				options={{ title: '카테고리 상세' }}
			/>
			<Stack.Screen
				name="AnalysisPersonal"
				component={AnalysisPersonalScreen}
				options={{ title: '카테고리 상세' }}
			/>
			<Stack.Screen name="AdjustTrip" component={AdjustScreen} options={{ title: '' }} />
			<Stack.Screen name="SendAdjust" component={SendAdjustScreen} options={{ title: '' }} />
			<Stack.Screen name="GetAdjust" component={GetAdjustScreen} options={{ title: '' }} />
			<Stack.Screen name="PayAdjust" component={PaymentScreen} options={{ title: '' }} />
			<Stack.Screen name="AddPayment" component={PaymentAddScreen} options={{ title: '' }} />
			<Stack.Screen name="ModifyPayment" component={PaymentModifyScreen} options={{ title: '' }} />
			<Stack.Screen name="Password" component={PaymentPasswordScreen} options={{ title: '' }} />
		</Stack.Navigator>
	);
}

export default TripStack;
