import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import RequestListItem from '../../components/Adjust/RequestListItem';
import CustomSwitch from '../../components/CustomSwitch';
import DashLine from '../../components/DashLine';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { adjustListItem } from '../../model/adjust';
import { TripStackProps } from '../../navigation/TripStack';
import { TextStyles } from '../../styles/CommonStyles';

type TripDetailScreenProps = NativeStackScreenProps<TripStackProps, 'AdjustTrip'>;

function AdjustScreen({ navigation, route }: TripDetailScreenProps) {
	const { tripId } = route.params;
	const [isSend, setIsSend] = useState(true);

	const [requestItems, setReqeustItems] = useState<adjustListItem[]>([]);

	const onSelectSwitch = (index: any) => {
		// Alert.alert('Selected index: ' + index);
		if (index == 2) setIsSend(false);
		else setIsSend(true);
	};

	const api = useAxiosWithAuth();
	useEffect(() => {
		if (isSend === true) {
			getRequestAdjustList();
		} else {
			getReceiveAdjustList();
		}
	}, [isSend]);

	const getRequestAdjustList = async () => {
		try {
			const res = await api.get(`calculate/request/${tripId}`);
			console.log(tripId);
			if (res.status === 200) {
				console.log(res.data);
				setReqeustItems(res.data);
				console.log(requestItems);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const getReceiveAdjustList = async () => {
		try {
			const res = await api.get(`calculate/receive/${tripId}`);
			console.log(tripId);
			if (res.status === 200) {
				console.log(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<View style={styles.viewContainer}>
			{isSend ? (
				<>
					<View style={{ marginBottom: 20 }}>
						<Text
							style={{
								...TextStyles({ align: 'left', weight: 'bold' }).header,
							}}
						>
							김싸피님의 지금까지
						</Text>
						<Text style={TextStyles({ align: 'left', weight: 'bold' }).header}>
							보낸 정산 목록입니다.
						</Text>
					</View>
					<DashLine />
					<View style={{ flexGrow: 1 }}>
						<RequestListItem navigation={navigation} test={requestItems} />
					</View>
				</>
			) : (
				<>
					<View style={{ marginBottom: 20 }}>
						<Text
							style={{
								...TextStyles({ align: 'left', weight: 'bold' }).header,
							}}
						>
							김싸피님의 지금까지
						</Text>
						<Text style={TextStyles({ align: 'left', weight: 'bold' }).header}>
							받은 정산 목록입니다.
						</Text>
					</View>
					<DashLine />
					<View style={{ flexGrow: 1 }}>
						<TouchableOpacity
							style={{
								flexDirection: 'row',
								backgroundColor: '#F6F6F6',
								alignItems: 'center',
								height: 80,
								marginTop: 20,
								paddingHorizontal: 10,
								// alignSelf: 'center',
								// alignContent: 'center',
								// borderBottomColor: '#D6D6D6',
								// borderBottomWidth: 0.5,
							}}
							onPress={() => navigation.navigate('GetAdjust', { adjustId: 1 })}
						>
							<Text style={{ ...TextStyles({ align: 'left' }).regular }}>23.09.01</Text>
							<View style={{ flex: 1 }}>
								<Text
									style={{
										...TextStyles({ align: 'right' }).title,
									}}
								>
									-200,000원
								</Text>
								<Text
									style={{
										...TextStyles({ align: 'right', color: '666666' }).small,
									}}
								>
									요청자 최싸피
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</>
			)}
			<View
				style={{
					alignItems: 'center',
					margin: 20,
					position: 'absolute',
					bottom: 0,
					alignSelf: 'center',
				}}
			>
				<CustomSwitch
					selectionMode={1}
					roundCorner={true}
					option1={'보낸 정산'}
					option2={'받은 정산'}
					onSelectSwitch={onSelectSwitch}
					selectionColor={'#91C0EB'}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flexGrow: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		paddingHorizontal: 15,
		backgroundColor: 'white',
	},
});

export default AdjustScreen;
