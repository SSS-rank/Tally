import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import RequestListItem from '../../components/Adjust/RequestListItem';
import ResponseListItem from '../../components/Adjust/ResponseListItem';
import CustomSwitch from '../../components/CustomSwitch';
import DashLine from '../../components/DashLine';
import useAxiosWithAuth from '../../hooks/useAxiosWithAuth';
import { adjustListItem } from '../../model/adjust';
import { AdjustTripScreenProps } from '../../model/tripNavigator';
import { TextStyles } from '../../styles/CommonStyles';

function AdjustScreen({ navigation, route }: AdjustTripScreenProps) {
	const { tripId } = route.params;
	const [isSend, setIsSend] = useState(true);

	const [requestItems, setReqeustItems] = useState<adjustListItem[]>([]);
	const [responseItems, setResponseItems] = useState<adjustListItem[]>([]);

	const onSelectSwitch = (index: any) => {
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
				setResponseItems(res.data);
				console.log(responseItems);
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
						<RequestListItem navigation={navigation} data={requestItems} />
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
						<ResponseListItem navigation={navigation} data={responseItems} />
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
