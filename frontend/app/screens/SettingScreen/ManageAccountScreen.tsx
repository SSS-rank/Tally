import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Avatar } from 'react-native-paper';

import { TextStyles } from '../../styles/CommonStyles';
const ManageAccountScreen = ({ navigation }: any) => {
	return (
		<View style={styles.viewContainer}>
			<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
				<Text style={{ ...TextStyles({ align: 'left', weight: 'bold' }).title }}>연결된 계좌</Text>
				<Button
					mode="text"
					style={{ flex: 1, alignItems: 'flex-end' }}
					onPress={() => navigation.navigate('AddAccount')}
				>
					계좌 추가
				</Button>
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
							...TextStyles({ align: 'left' }).medium,
							lineHeight: 20,
						}}
					>
						SSS뱅크 1002-111-222333
					</Text>
					<Text
						style={{
							...TextStyles({ align: 'left' }).regular,
							lineHeight: 20,
						}}
					>
						104,082원
					</Text>
				</View>
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
							...TextStyles({ align: 'left' }).medium,
							lineHeight: 20,
						}}
					>
						SSS뱅크 1002-111-222333
					</Text>
					<Text
						style={{
							...TextStyles({ align: 'left' }).regular,
							lineHeight: 20,
						}}
					>
						104,082원
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		backgroundColor: 'white',
		paddingHorizontal: 15,
	},
});
export default ManageAccountScreen;
