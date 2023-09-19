import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import DashLine from '../../components/DashLine';
import { TextStyles } from '../../styles/CommonStyles';

const SendAdjuestScreen = () => {
	return (
		<View style={styles.viewContainer}>
			<View style={{ marginBottom: 20 }}>
				<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
					<Text style={TextStyles({ align: 'left', weight: 'bold' }).header}>부산 호캉스</Text>
					<Text style={TextStyles({ align: 'left', color: '#666666' }).small}> 국내</Text>
				</View>
				<Text style={TextStyles({ align: 'left', color: '#666666' }).small}>2023.09.03</Text>
			</View>
			<DashLine />
			<View
				style={{
					alignItems: 'center',
					marginVertical: 20,
				}}
			>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: 70,
						paddingHorizontal: 10,
					}}
					onPress={() => {}}
				>
					<Text style={{ ...TextStyles().regular }}>박싸피</Text>
					<Text
						style={{
							...TextStyles({ align: 'right' }).title,
							flex: 1,
							lineHeight: 70,
						}}
					>
						154,032원
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: 70,
						paddingHorizontal: 10,
					}}
					onPress={() => {}}
				>
					<Text style={{ ...TextStyles().regular }}>이싸피</Text>
					<Text
						style={{
							...TextStyles({ align: 'right' }).title,
							flex: 1,
							lineHeight: 70,
						}}
					>
						150,525원
					</Text>
				</TouchableOpacity>
			</View>
			<DashLine />
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					height: 70,
					paddingHorizontal: 10,
				}}
			>
				<Text style={{ ...TextStyles().medium }}>합계</Text>
				<Text
					style={{
						...TextStyles({ color: '#91C0EB', align: 'right', weight: 'bold' }).title,
						flex: 1,
						lineHeight: 70,
					}}
				>
					150,525원
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	viewContainer: {
		flexGrow: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		paddingHorizontal: 15,
		backgroundColor: 'white',
	},
});
export default SendAdjuestScreen;
