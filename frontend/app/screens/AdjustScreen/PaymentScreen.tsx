import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Avatar } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import { TextStyles } from '../../styles/CommonStyles';
const PaymentScreen = () => {
	const [isCheck, setIsCheck] = useState(false);
	return (
		<View style={styles.viewContainer}>
			<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).title, marginVertical: 10 }}>
				결제할 계좌 선택
			</Text>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginVertical: 15,
					marginHorizontal: 5,
				}}
			>
				<Avatar.Image
					style={{ backgroundColor: 'transparent', marginHorizontal: 5 }}
					size={48}
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
				<Icon
					name={isCheck ? 'checkmark-circle' : 'checkmark-circle-outline'}
					size={32}
					color={isCheck ? '#91C0EB' : '#D0D0D0'}
					style={{ marginLeft: 5 }}
					onPress={() => {
						setIsCheck(!isCheck);
					}}
				/>
			</View>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginVertical: 15,
					marginHorizontal: 5,
				}}
			>
				<Avatar.Image
					style={{ backgroundColor: 'transparent', marginHorizontal: 5 }}
					size={48}
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
				<Icon
					name={isCheck ? 'checkmark-circle' : 'checkmark-circle-outline'}
					size={32}
					color={isCheck ? '#91C0EB' : '#D0D0D0'}
					style={{ marginLeft: 5 }}
					onPress={() => {
						setIsCheck(!isCheck);
					}}
				/>
			</View>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginVertical: 20,
					marginHorizontal: 5,
				}}
			>
				<Avatar.Image
					style={{ backgroundColor: 'transparent', marginHorizontal: 5 }}
					size={48}
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
				<Icon
					name={isCheck ? 'checkmark-circle' : 'checkmark-circle-outline'}
					size={32}
					color={isCheck ? '#91C0EB' : '#D0D0D0'}
					style={{ marginLeft: 5 }}
					onPress={() => {
						setIsCheck(!isCheck);
					}}
				/>
			</View>
			<View style={{ justifyContent: 'flex-end', flex: 1, marginVertical: 30 }}>
				<Button mode="elevated" buttonColor="#91C0EB" textColor="white">
					완료
				</Button>
			</View>
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
