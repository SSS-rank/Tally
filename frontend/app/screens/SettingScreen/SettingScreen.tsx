import React, { useState } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';

import Line from '../../components/Line';
import { TextStyles } from '../../styles/CommonStyles';

function SettingScreen() {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
	return (
		<View style={styles.viewContainer}>
			<View style={styles.wrap}>
				<Text style={styles.title}>알림</Text>
				<View style={{ flexDirection: 'row' }}>
					<Text style={styles.subTitle}>알림허용</Text>
					<Switch
						trackColor={{ false: '#767577', true: '#91C0EB' }}
						thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
						ios_backgroundColor="#3e3e3e"
						onValueChange={toggleSwitch}
						value={isEnabled}
						style={{ flex: 1, alignContent: 'flex-end' }}
					/>
				</View>
				<Line marginTop={10} />
			</View>
			<View style={styles.wrap}>
				<Text style={styles.title}>계좌 관리</Text>
				<Text style={styles.subTitle}>대표 계좌 지정</Text>
				<Text style={styles.subTitle}>계좌 연결 관리</Text>
				<Text style={styles.subTitle}>이체 비밀번호 관리</Text>
				<Line marginTop={10} />
			</View>
			<View style={{ flexDirection: 'row' }}>
				<Text
					style={{ ...TextStyles({ align: 'right', color: '#666666', mRight: 15 }).small, flex: 1 }}
				>
					로그아웃
				</Text>
				<Text
					style={{ ...TextStyles({ align: 'left', color: '#666666', mLeft: 15 }).small, flex: 1 }}
				>
					회원 탈퇴
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: 'white',
		padding: 10,
	},

	wrap: {
		marginVertical: 10,
	},

	title: {
		...TextStyles({ align: 'left', mBottom: 10, weight: 'bold' }).title,
	},
	subTitle: {
		...TextStyles({ align: 'left' }).regular,
		marginVertical: 15,
	},
});

export default SettingScreen;
