import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Avatar } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import { TextStyles } from '../../styles/CommonStyles';
const PaymentScreen = () => {
	return (
		<View style={styles.viewContainer}>
			<Text style={TextStyles({ align: 'left' }).title}>결제할 계좌 선택</Text>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginVertical: 20,
					marginHorizontal: 5,
				}}
			>
				<Avatar.Image
					style={{ backgroundColor: 'transparent' }}
					size={54}
					source={require('../../assets/images/kakao.png')}
				/>
				<View style={{ paddingHorizontal: 10, flex: 1 }}>
					<Text
						style={{
							...TextStyles({ align: 'left' }).regular,
							lineHeight: 20,
						}}
					>
						SSS뱅크 1002-111-222333
					</Text>
					<Text
						style={{
							...TextStyles({ align: 'left' }).medium,
							lineHeight: 20,
						}}
					>
						104,082원
					</Text>
				</View>
				{/* <Text
					style={{
						...TextStyles({ align: 'left' }).regular,
						lineHeight: 20,
					}}
				>
					check
				</Text> */}
				<Icon name="checkmark-circle" size={32} color="#91C0EB" style={{ marginLeft: 5 }} />
				{/* <Icon name="checkmark-circle" size={32} color="#D0D0D0" style={{ marginLeft: 5 }} /> */}
				<Icon name="checkmark-circle-outline" size={32} color="#D0D0D0" style={{ marginLeft: 5 }} />
			</View>
			<Button mode="elevated" buttonColor="#91C0EB" textColor="white">
				완료
			</Button>
		</View>
	);
};
const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		backgroundColor: 'white',
		paddingHorizontal: 15,
		// justifyContent: 'center',
		// alignItems: 'center',
	},
});
export default PaymentScreen;
