import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import DashLine from '../../components/DashLine';
import { TextStyles } from '../../styles/CommonStyles';

const SendAdjuestScreen = () => {
	const [ischecked, setIsChecked] = useState(true);
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
							verticalAlign: 'middle',
						}}
					>
						154,032원
					</Text>
					<Icon name="chevron-forward" size={20} color="#666666" style={{ marginLeft: 5 }} />
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
					<Icon name="chevron-forward" size={20} color="#666666" style={{ marginLeft: 5 }} />
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
			<View
				style={{
					paddingHorizontal: 10,
					// justifyContent: 'center',
					alignContent: 'center',
				}}
			>
				<Text style={TextStyles({ align: 'left', mTop: 20, mBottom: 15 }).regular}>
					인원 별 정산 현황
				</Text>
				<View
					style={{
						marginBottom: 15,
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Avatar.Image
						// style={ViewStyles({ left: 0 }).avatarMate}
						size={45}
						source={require('../../assets/images/kakao.png')}
					/>
					<Text
						style={{
							...TextStyles({ align: 'left' }).medium,
							flex: 1,
							paddingHorizontal: 10,
						}}
					>
						이싸피
					</Text>
					{!ischecked ? (
						<Text style={{ ...TextStyles({ align: 'right', color: '#91C0EB' }).medium }}>
							요청 중
						</Text>
					) : (
						<Text style={{ ...TextStyles({ align: 'right' }).medium }}>확인 완료</Text>
					)}
				</View>
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
