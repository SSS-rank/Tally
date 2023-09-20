import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import CustomSwitch from '../../components/CustomSwitch';
import DashLine from '../../components/DashLine';
import { TextStyles } from '../../styles/CommonStyles';

function AdjustScreen({ navigation }: any) {
	const [isSend, setIsSend] = useState(true);
	const onSelectSwitch = (index: any) => {
		// Alert.alert('Selected index: ' + index);
		if (index == 2) setIsSend(false);
		else setIsSend(true);
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
						<TouchableOpacity
							style={{
								flexDirection: 'row',
								backgroundColor: '#F6F6F6',
								alignItems: 'center',
								height: 80,
								marginTop: 20,
								paddingHorizontal: 10,
							}}
							onPress={() => navigation.navigate('TripStack', { screen: 'SendAdjust' })}
						>
							<Text style={{ ...TextStyles().regular }}>23.09.01</Text>
							<Text
								style={{
									...TextStyles({ align: 'right' }).title,
									flex: 1,
									lineHeight: 60,
								}}
							>
								200,000원
							</Text>
						</TouchableOpacity>
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
							onPress={() => navigation.navigate('TripStack', { screen: 'GetAdjust' })}
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
