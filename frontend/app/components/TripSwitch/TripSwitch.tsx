import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TripSwitchProp {
	selectionMode: string;
}

function TripSwitch({ selectionMode }: TripSwitchProp) {
	const [getSelectionMode, setSelectionMode] = useState(selectionMode);

	return (
		<View>
			<View style={styles.switchContainer}>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => setSelectionMode('before')}
					style={{
						...styles.switchInner,
						backgroundColor: getSelectionMode == 'before' ? '#91C0EB' : 'white',
					}}
				>
					<Text
						style={{
							color: getSelectionMode == 'before' ? 'white' : '#91C0EB',
						}}
					>
						여행 전
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => setSelectionMode('ongoing')}
					style={{
						...styles.switchInner,
						backgroundColor: getSelectionMode == 'ongoing' ? '#91C0EB' : 'white',
					}}
				>
					<Text
						style={{
							color: getSelectionMode == 'ongoing' ? 'white' : '#91C0EB',
						}}
					>
						여행 중
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => setSelectionMode('end')}
					style={{
						...styles.switchInner,
						backgroundColor: getSelectionMode == 'end' ? '#91C0EB' : 'white',
					}}
				>
					<Text
						style={{
							color: getSelectionMode == 'end' ? 'white' : '#91C0EB',
						}}
					>
						여행 후
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	switchContainer: {
		height: 44,
		width: '70%',
		backgroundColor: 'white',
		borderRadius: 25,
		borderWidth: 1,
		borderColor: '#91C0EB',
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 2,
	},
	switchInner: {
		flex: 1,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default TripSwitch;
