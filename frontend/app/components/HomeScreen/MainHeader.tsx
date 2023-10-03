import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilValue } from 'recoil';

import { alertCheckState } from '../../recoil/alertRecoil';
import { MemberState } from '../../recoil/memberRecoil';
import { TextStyles } from '../../styles/CommonStyles';
import { ViewStyles } from '../../styles/HomeStyles';
function MainHeader({ navigation }: any) {
	const alertCheck = useRecoilValue(alertCheckState);
	return (
		<View style={ViewStyles({ flexDirection: 'row' }).header}>
			<Text
				style={{
					...TextStyles({ align: 'left', weight: 'bold', color: 'white' }).title,
					flex: 1,
				}}
			>
				TALLY
			</Text>
			<View style={styles.alertCheckView}>
				<MaterialCommunityIcons
					name="bell"
					color="white"
					size={24}
					onPress={() => navigation.navigate('Alert')}
				/>
				{alertCheck && <View style={styles.checkBadge}></View>}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	alertCheckView: {
		position: 'relative',
	},
	checkBadge: {
		position: 'absolute',
		width: 12,
		height: 12,
		bottom: 10,
		right: -2,
		borderRadius: 50,
		backgroundColor: '#b3261e',
	},
});

export default MainHeader;
